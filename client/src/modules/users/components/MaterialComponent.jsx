
import { material } from '../api/userApi'

const MaterialComponent = () => {
    const response = material()
    
  return (
    <div>
        {JSON.stringify(response)}
    </div>
  )
}

export default MaterialComponent