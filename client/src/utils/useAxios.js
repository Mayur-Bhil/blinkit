import axios from "axios";
import { BASE_URL } from "../common/summuryApi";

const Axios =  axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})

export default Axios;