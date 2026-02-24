import { ApiError } from "../../utils/ApiError"
import { User } from "./user.model";


export async function userProfileService(userId) {
    
    try {
        const user = await User.findById({userId})
        
        return {}
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500);
    }

}