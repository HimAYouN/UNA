import { useState } from "react"
import { login } from "../api/authApi"

export const useLogin= ()=> {
    const [loader, setLoader] = useState(false)

    const loginUser = (data) => {
        setLoader(true)
        login(data)
        setLoader(false)

    }

    return {loader, setLoader, loginUser}
}