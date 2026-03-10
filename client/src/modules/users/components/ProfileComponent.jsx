
import { userProfile } from '../hooks/useProfile'

const ProfileComponent = () => {
    const {loader, setLoader, response} = userProfile()

    if(loader) return <h1> Loading...</h1>
  return (
    <div>
        <h1>ID : {response._id}</h1>
        <h1>Name : {response.username}</h1>
        <h1>Email : {response.email}</h1>
        <h1>Role : {response.role}</h1>
    </div>
  )
}

export default ProfileComponent