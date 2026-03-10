import axios from "axios"
import { BASE_API } from "../constant"


const axiosClient = async (data, API) => {
    try {
        const response = await axios.post(`${BASE_API}${API}`, data, {withCredentials: true})
        if(response.status == 401){
            
        }

    } catch (error) {
        console.log("SOMETHING WENT WRONG: ", error)
    }
}
