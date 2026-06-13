import {asyncHandler} from "../../../utils/asyncHandler.js";
import {createAuthService} from '../services/authService.js';
import {http_status} from "../../../shared/constants.js";


const authServices = createAuthService()

export const register = asyncHandler(async (req, res) => {
    const {user, accessToken, refreshToken} = await authServices.register(req.body)

    res.status(http_status.created).json({
        user, accessToken, refreshToken
    }, 'user registered successfully')
})