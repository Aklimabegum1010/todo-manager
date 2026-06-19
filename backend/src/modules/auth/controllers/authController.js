import {asyncHandler} from "../../../utils/asyncHandler.js";

import {http_status} from "../../../shared/constants.js";
import {ApiResponse} from "../../../utils/apiResponse.js";
import {AuthService} from "../services/authService.js";


const authServices = new AuthService()

export const register = asyncHandler(async (req, res) => {
    const {user, accessToken, refreshToken} = await authServices.register(req.body)
   new ApiResponse(http_status.created, {user, accessToken, refreshToken},'user registered successfully').send(res)
})
export const login = asyncHandler(async (req, res) => {
    const {user, accessToken, refreshToken} = await authServices.login(req.body)
   new ApiResponse(http_status.ok, {user, accessToken, refreshToken},'logged in successfully').send(res)
})