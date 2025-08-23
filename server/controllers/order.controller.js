import mongoose from "mongoose";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import cartProduct from "../models/cartProduct.model.js";
import stripe from "../config/stripe.js"

export const CashOndeleveryOrderController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const userId = req.userId;
        const {list_items, totalAmount, addressId, subTotalAmount} = req.body;

        // Validate required fields
        if (!list_items?.length || !addressId || !totalAmount) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            });
        }

        try {
            // Generate orderId
            const orderId = "OD" + Date.now() + Math.floor(Math.random() * 1000);

            // Create order
            const newOrder = await Order.create([{
                userId,
                orderId,
                list_items: list_items.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    image: item.image,
                    quantity: item.quantity,
                    price: item.price
                })),
                payment_method: "COD",
                payment_status: "PENDING",
                order_status: "PLACED",
                delivery_address: addressId,
                subTotalAmount,
                totalAmount
            }], { session });

            // Clear user's cart
            await Promise.all([
                User.findByIdAndUpdate(
                    userId,
                    { $set: { shopping_cart: [] } },
                    { session }
                ),
                cartProduct.deleteMany({ userId }, { session })
            ]);

            await session.commitTransaction();

            return res.status(200).json({
                message: "Order placed successfully",
                success: true,
                data: newOrder[0]
            });

        } catch (error) {
            await session.abortTransaction();
            throw error;
        }

    } catch (error) {
        await session.abortTransaction();
        console.error("Order creation error:", error);
        return res.status(500).json({
            message: "Failed to place order",
            success: false
        });
    } finally {
        session.endSession();
    }
};

// Fix the price calculation function
export const priceWithDisCount = (price, discount = 0) => {
    const discountAmount = Math.ceil((Number(price) * Number(discount)) / 100);
    return Math.round(Number(price) - discountAmount);
}

export const onlinePaymentController = async(req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const userId = req.userId;
        const {list_items, totalAmount, addressId, subTotalAmount} = req.body;

        // Input validation
        if (!list_items?.length || !addressId || !totalAmount) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        // Generate orderId
        const orderId = `OD${Date.now()}${Math.floor(Math.random() * 1000)}`;

        try {
            // Format line items for Stripe
            const line_items = list_items.map(item => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.name,
                        images: [item.image].filter(Boolean),
                    },
                    unit_amount: Math.round(item.price * 100), // Convert to paise
                },
                quantity: item.quantity,
            }));

            // Create Stripe session
            const stripeSession = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                customer_email: user.email,
                metadata: {
                    userId,
                    orderId,
                    addressId
                },
                line_items,
                success_url: `${process.env.BASE_URL}/success?orderId=${orderId}`,
                cancel_url: `${process.env.BASE_URL}/cancel`,
            });

            // Create order in DB with valid enum values
            await Order.create([{
                userId,
                orderId,
                list_items: list_items.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    image: item.image,
                    quantity: item.quantity,
                    price: item.price
                })),
                payment_method: "ONLINE",
                payment_status: "PENDING",
                order_status: "PLACED", // Changed from INITIATED to PLACED
                delivery_address: addressId,
                subTotalAmount,
                totalAmount,
                paymentId: stripeSession.id // Using paymentId instead of stripeSessionId
            }], { session });

            await session.commitTransaction();

            return res.status(200).json({
                success: true,
                url: stripeSession.url
            });

        } catch (stripeError) {
            throw new Error(stripeError.message);
        }

    } catch (error) {
        await session.abortTransaction();
        console.error("Payment Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Payment initialization failed"
        });
    } finally {
        session.endSession();
    }
};


export const updateOrderStatusController = async(req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { orderId } = req.params;
        const userId = req.userId;

        // Update order status and clear cart
        try {
            // Update order status
            const order = await Order.findOneAndUpdate(
                { orderId, userId },
                { 
                    $set: { 
                        payment_status: "COMPLETED",
                        order_status: "CONFIRMED"
                    }
                },
                { session, new: true }
            );

            if (!order) {
                throw new Error("Order not found");
            }

            // Clear user's cart
            await Promise.all([
                User.findByIdAndUpdate(
                    userId,
                    { $set: { shopping_cart: [] } },
                    { session }
                ),
                cartProduct.deleteMany({ userId }, { session })
            ]);

            await session.commitTransaction();

            return res.status(200).json({
                success: true,
                message: "Order completed successfully",
                data: order
            });

        } catch (error) {
            throw new Error(error.message);
        }

    } catch (error) {
        await session.abortTransaction();
        console.error("Order status update error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update order status"
        });
    } finally {
        session.endSession();
    }
};

export const clearCartController = async (req, res) => {
    try {
        const userId = req.userId;

        // Use transaction for data consistency
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Clear cart from both User and CartProduct collections
            await Promise.all([
                User.findByIdAndUpdate(
                    userId,
                    { $set: { shopping_cart: [] } },
                    { session }
                ),
                cartProduct.deleteMany({ userId }, { session })
            ]);

            await session.commitTransaction();

            return res.status(200).json({
                success: true,
                message: "Cart cleared successfully"
            });
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    } catch (error) {
        console.error("Clear cart error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to clear cart"
        });
    }
};