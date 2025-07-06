import summeryApis from "../common/summuryApi";
import Axios from "./useAxios";

const getUserDetails = async()=>{
    try {
        const response = await Axios({
            ...summeryApis.userDetails
        })
        return response
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            message: "Something went wrong"
        })
    }
}

export default getUserDetails;