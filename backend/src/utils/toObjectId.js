import {Types} from "mongoose";
import {ApiError} from "./apiError.js";
import {http_status} from "../shared/constants.js";



//toObjectId কাজ: ক্লায়েন্ট থেকে আসা স্ট্রিং আইডি-কে (যেমন: '64a8f...')
// MongoDB-এর আসল ObjectId তে রূপান্তর করে এবং আইডি-টি
// সঠিক (Valid) কি না তা ভ্যালিডেট করে।


export const toObjectId =(id, label ='ID') => {

    //Types.ObjectId.isValid(id) দিয়ে চেক করা হচ্ছে আইডিটি মঙ্গোডিবি-র
    // আসল আইডি ফরম্যাটে আছে কি না। যদি সঠিক না হয়, তবে এটি একটি
    // Bad Request (400) এর ApiError ছুঁড়ে মারবে।
if (!Types.ObjectId.isValid(id)){
throw new ApiError(http_status.bad_request, `invalid ${label}: ${id}`)
}
return new Types.ObjectId(id)
}