

export async function userProfile(req, res, next) {
    try {
        const userId = req.user.userId
        const result = userProfileService(userId)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }

}