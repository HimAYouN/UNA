import { useMaterial } from "../hooks/useMaterial"


const MaterialComponent = () => {
    const {loader, setLoader, response} = useMaterial()
    
  return (
    <div>
        {JSON.stringify(response)}
    </div>
  )
}

export default MaterialComponent