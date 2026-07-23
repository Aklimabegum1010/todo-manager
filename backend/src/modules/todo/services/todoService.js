import {TodoRepository} from "../repositories/todoRepository.js";
import {ApiError} from "../../../utils/apiError.js";
import {http_status, pagination} from "../../../shared/constants.js";
import {todo_status} from "../../../shared/enums.js";
import {deleteAllTodos} from "../controllers/todoController.js";

export class TodoService {
    constructor(repository = new TodoRepository()) {
        this.todoRepository = repository
    }

    async create(todoData, userId) {
        try {
            return await this.todoRepository.create({...todoData, user: userId})
        } catch (error) {
           if (error.message === 'duplicate title') {
               throw new ApiError(http_status.conflict, 'title already exists')
           }
           throw error
        }
    }

async bulkCreate(todosArray, userId) {
        const todoWithUser = (todosArray || []).map(todo => ({
            ...todo, user:userId
        }))
    try {
const created = await this.todoRepository.insertMany(todoWithUser)
        return {count: created.length, todos: created}
    }catch (error) {
        if (error.code === 11000 || error.name === 'MongoBulkWriteError') {
            const inserted = error.insertedDocs ?? []
            const failedCount = todosArray.length - inserted.length
            return {
                count: inserted.length,
                todos: inserted,
                warnings: failedCount > 0 ? `${failedCount} todos were skipped`: undefined
            }
        }
        throw error
    }
}



             //get er kaj


    static #buildFilterQuery ({status, priority, overdue}, userId) {
        const query = {user: userId}
        if (overdue) {
            query.status = todo_status.active
            query.dueDate = {$lt: new Date(new Date().setHours(0, 0, 0, 0))}
        }

        else {
            if (status) query.status = status
        }
        if (priority) query.priority = priority
        return query
    }


    async getAll(filters, userId){
      const {page = pagination.default_page, limit = pagination
    .default_limit, search, ...filterQuery} = filters
        const filtersQuery = TodoService.#buildFilterQuery(filterQuery, userId)
        const {todos, total} = await this.todoRepository.findWithPagination(filtersQuery, {
            page, limit
        }, search)
        return{
          todos,
            pagination: {
              total,
                currentPage: page
            }
        }
    }




    
async getById(id, userId){

const todo = await this.todoRepository.findOneByIdAndUser(id, userId)
    if (!todo){
        throw new ApiError(http_status.not_found, 'Todo not found')
    }
    return  todo
}



//update todo//

async update(id, updateData, userId){
const todo = await this.todoRepository.updateOneByIdAndUser(id, updateData, userId)
    if (!todo) {
        throw new ApiError(http_status.not_found, 'Todo not found')
    }
    return todo
}

async delete(id, userId){
    const todo = await this.todoRepository.deleteOneByIdAndUser(id, userId)
    if (!todo) {
        throw new ApiError(http_status.not_found, 'Todo not found')
    }
    return todo
}



async deleteAll(userId){
    const todo = await this.todoRepository.deleteManyUser(userId)

    return {
        deletedCount: todos.deletedCount
    }
}







}









