import toast from "react-hot-toast"
const AxiosToastError = (error) =>{
    toast.error(error?.response?.data?.message && "Enter email,name ,password")
}   

export default AxiosToastError