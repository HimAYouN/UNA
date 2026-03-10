import { useEffect, useState } from "react"
import { material } from "../api/userApi"

export const useMaterial = () => {

    const [laoder, setLoader] = useState(true)
    const [response, setResponse] = useState({})

    useEffect (()=>{
        fetchMaterial()
    },[])

    const fetchMaterial =  async () => {
        setLoader(true)
        const res = await material()
        setResponse(res)
        setLoader(false)
    }


    return { laoder, setLoader, response}

}