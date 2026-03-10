import { logout } from "../api/authApi"

export const useLogout =()=> {
    const logoutUser = () => {
        logout()
    }

    return {logoutUser}
}
