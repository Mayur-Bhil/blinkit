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
        throw error;
    }
}

export default getUserDetails;