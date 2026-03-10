import React from 'react'
import { useLogout } from '../hooks/useLogout'

const Logout = () => {
    const {logoutUser} = useLogout()
  return (
    <div>
        <button onClick={logoutUser}>Logout</button>
    </div>
  )
}

export default Logout