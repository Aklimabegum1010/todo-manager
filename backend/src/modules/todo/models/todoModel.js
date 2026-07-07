import mongoose from "mongoose";
import {validation} from "../../../shared/constants.js";
import {priority_status, todo_status, valid_priority_status, valid_todo_status} from "../../../shared/enums.js";

export const todoSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    title:{
        type: String,
        required: [true, 'title is required'],
        trim: true,
        minLength: [1, 'title cannot be empty'],
        maxLength: [validation.title_max_Length, `title cannot be exceed ${validation.title_max_Length} characters` ],
        validate: {
            validator: v => v != null && v.trim().length > 0,
            message: 'title cannot be blank'
        }
    },

    description:{
        type: String,
        required: [true, 'description is required'],
        maxLength: [validation.description_max_Length, `description cannot be exceed ${validation.description_max_Length} characters` ],
    },
    status: {
        type: String,
        enum: {
            values: valid_todo_status,
            message: `status must be one of ${valid_todo_status.join(', ')}`,

        },
        default: todo_status.active
    },

priority: {
    type:String,
    enum: {
        values: valid_priority_status,
        message: `${valid_priority_status.join(', ')} is not a valid`,

    },
    default: priority_status.low,
    index: true
},


    dueDate: {
        type:Date,
        default: null,
        index: true
    }

    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id.toString()
                delete ret._id
        }
    }

})
export const title_collation ={locale: 'en', strength: 2}


// todoSchema.index({user:1, priority: 1})
// todoSchema.index({user:1, dueDate: 1})


todoSchema.index({user: 1, title: 1}, {unique:true, collation: title_collation})
todoSchema.index({user:1, status: 1, createdAt: -1})
todoSchema.index({user:1, title: 'text', description: 'text'})
export const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema)