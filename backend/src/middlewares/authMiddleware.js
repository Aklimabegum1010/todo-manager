import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {http_status} from "../shared/constants.js";
import {verify} from "jsonwebtoken";
import {verifyAccessToken} from "../utils/jwt.js";
import {UserRepository} from "../modules/auth/repositories/authRepository.js";




const userRepository = new UserRepository()



// এটা একটা Authentication Middleware। কোনো
// protected route-এ request আসলে আগে এই middleware
// চলে এবং চেক করে: Token আছে কিনা? → সঠিক format-এ আছে কিনা? → তারপর route-এ যেতে দেবে


export const protect = asyncHandler(async (req, _res, next) => {

    // Client যখন request পাঠায়, সাথে headers পাঠায়।
    // authorization header-এ token থাকে।
const authHeader = req.headers.authorization


    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(http_status.unauthorized, 'not authorized and no token provided')
    }
    const token = authHeader.split(' ').at(1)
const decoded = verifyAccessToken(token)
    const user = await userRepository.findById(decoded.id, '-password -__v')
    if (!user){
        throw new ApiError(http_status.unauthorized, 'not authorized and user not found')
    }
    req.user = user
    next()
})