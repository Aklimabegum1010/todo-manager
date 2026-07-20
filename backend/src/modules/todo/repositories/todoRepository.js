
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

    const fuzzyOptions = search.length > 2 ? { fuzzy: { maxEdits: 1 }} : {};

    const searchStage = {
        $search: {
            index: 'todo_autocomplete',
            compound: {
                should: [
                    {
                      autocomplete: {
                          query: search,
                          path: 'title',
                         ...fuzzyOptions,
                      }
                    },
                    {
                      autocomplete: {
                          query: search,
                          path: 'description',
                          ...fuzzyOptions
                      }
                    }
                ],
                minimumShouldMatch: 1
            }
        }
}
        const pipeline = [
            searchStage,
            {$match: matchQuery},
            ...(sort ? [{$sort: sort}] : []),
            {$skip: skip},
            {$limit: limit}
        ]
    const countPipeline = [
        searchStage,
        {$match: matchQuery},
        {$count: 'total'}
    ]
    const [todos, countResult] = await Promise.all([
        this.model.aggregate(pipeline),
        this.model.aggregate(countPipeline)
    ]);
    const total = countResult[0]?.total || 0;
    return {todos: todos.map(toPlainObject), total};
        }
        const [todos,total] = await Promise.all([
            this.model.find(query).sort(sort).skip(skip).limit(limit).lean(),
            this.model.countDocuments(query)
        ])

        return{todos: todos.map(toPlainObject), total}
    }




// get er kaj id diye //

#ownerFilter(id, userId){
return{
    _id: toObjectId(id, 'Todo ID'),
    user: toObjectId(userId, 'User ID')
}
}





async findOneByIdAndUser(id, userId){
const todo = await this.model.findOne(this.#ownerFilter(id, userId)).lean()
    return toPlainObject(todo)
}

}



