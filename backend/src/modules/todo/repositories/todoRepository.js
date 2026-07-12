
import {title_collation, Todo} from "../models/todoModel.js";
import {http_status} from "../../../shared/constants.js";
import {ApiError} from "../../../utils/apiError.js";
import {toPlainObject} from "../../../utils/toPlainObject.js";
import {toObjectId} from "../../../utils/toObjectId.js";



const default_sort ={createdAt: -1}


export class TodoRepository {
    constructor(model = Todo) {
        this.model = model
    }
    async create(todoData){
try {
    return await this.model.create(todoData)
}catch (error){
    if (error.code === 11000){
        throw new Error('duplicate title')
    }

}
    }
    async insertMany(todos) {
        return this.model.insertMany(todos, {ordered: false, collation:
            title_collation})
    }


          //get er kaj

    async findWithPagination(query, {page, limit, sort = default_sort}, search = null) {
    if (page < 1 || limit < 1) {
        throw new ApiError(http_status.bad_request, `invalid pagination params: page=${page}, limit=${limit}`)
    }
    const skip = (page -1) * limit

if (search){
    const matchQuery = {...query}


    if (matchQuery.user){
        matchQuery.user = toObjectId(matchQuery.user, 'User ID')
    }
const searchStage = {
        $search: {
            index: 'todo_autocomplete',
            compound: {
                should: [
                    {
                      autocomplete: {
                          query: search,
                          path: 'title',
                          fuzzy: {maxEdits: 1}
                      }
                    },
                    {
                      autocomplete: {
                          query: search,
                          path: 'title',
                          fuzzy: {maxEdits: 1}
                      }
                    }
                ],
                minimumShouldMatch: 1
            }
        }
}


}
        const [todos, total] = await Promise.all([this.model.find(query).sort
        (sort).skip(skip).limit(limit).lean(),this.model.countDocuments(query)])
        return{todos: todos.map(toPlainObject), total}
    }
}



