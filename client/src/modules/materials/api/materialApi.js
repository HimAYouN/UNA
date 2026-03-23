import axios from "axios"
import { BASE_API } from "../../../constant"

export const uploadMaterial = async (data) => {
    try {
        if(!data) return ("Data not recieved!")
            // console.log(data)
        const response = axios.post(`${BASE_API}/materials`, data, {withCredentials: true})
        return response;
    } catch (error) {
        console.log("Something went wrong: ", error)
    }
}
