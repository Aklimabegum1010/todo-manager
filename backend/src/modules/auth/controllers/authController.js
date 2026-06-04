import {asyncHandler} from "../../../utils/asyncHandler.js";
import {createAuthService} from '../services/authService.js';
import {http_status} from "../../../shared/constants.js";


const authService = createAuthService()

export const register = asyncHandler(async (req, res) => {
    const {user} = await authService.register(req.body)
    res.status(http_status.created).json({
        user
    }, 'user registered successfully')
})