import mongoose from "mongoose";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import cartProduct from "../models/cartProduct.model.js";

export const CashOndeleveryOrderController = async (req, res) => {
    try {
        const userId = req.userId;
        const {list_items, totalAmount, addressId, subTotalAmount} = req.body;

        // Validate required fields
        if (!list_items?.length || !addressId || !totalAmount) {
            return res.status(400).json({
                message: "Missing required fields",
                error: true,
                success: false
            });
        }

        // Start a session for transaction
        const session = await mongoose.startSession();
        session.startTransaction();

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
                // Also clear the cart products collection
                cartProduct.deleteMany({ userId }, { session })
            ]);

            // Commit the transaction
            await session.commitTransaction();

            return res.status(200).json({
                message: "Order placed successfully!",
                success: true,
                error: false,
                data: newOrder[0]
            });

        } catch (error) {
            // If anything fails, abort the transaction
            await session.abortTransaction();
            throw error;
        } finally {
            // End the session
            session.endSession();
        }

    } catch (error) {
        console.error("Order creation error:", error);
        return res.status(500).json({
            message: error.message || "Something went wrong while creating order",
            error: true,
            success: false
        });
    }
}