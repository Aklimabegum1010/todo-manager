import {TodoRepository} from "../repositories/todoRepository.js";
import {ApiError} from "../../../utils/apiError.js";
import {http_status} from "../../../shared/constants.js";

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

}

