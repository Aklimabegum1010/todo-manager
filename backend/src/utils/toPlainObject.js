

// toPlainObject কাজ: MongoDB বা Mongoose-এর রিটার্ন করা ডকুমেন্টকে একটি
// সাধারণ (Plain) জাভাস্ক্রিপ্ট অবজেক্টে রূপান্তর করে,
// যেখানে _id কে id তে পরিবর্তন করা হয় এবং
// অপ্রয়োজনীয় __v ফিল্ড মুছে ফেলা হয়।

export const toPlainObject = doc => {
    if (!doc) return null
    let obj
    if (typeof doc.toObject === 'function') {
        obj = doc.toObject()
    }
    else {
        obj = {...doc}
    }
    if(obj._id) {
        obj.id = obj._id.toString()
        delete obj._id
    }
if (obj.__v !== undefined) {
delete obj.__v
}
return obj
}