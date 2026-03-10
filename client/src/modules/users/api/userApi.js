import axios from "axios"
import { BASE_API } from "../../../constant"

export const profile = async () => {
    try {
        const response = await axios.get(`${BASE_API}/user/me`, {withCredentials: true})
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log("Something went wrong: ", error)
    }
}



export const material = async () => {
    try {
        const response = await axios.get(`${BASE_API}/user/me/materials`, {withCredentials: true})
        return response.data;
    } catch (error) {
        console.log("Something went wrong: ", error)
    }
}
