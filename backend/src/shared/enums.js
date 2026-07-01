export const todo_status = Object.freeze({
    active: 'active',
    inactive: 'inactive',
    completed: 'completed'
})
export const valid_todo_status = Object.freeze(Object.values(todo_status))

export const priority_status = Object.freeze({
    low: 'low',
    medium: 'medium',
    high: 'high'
})
export const valid_priority_status = Object.freeze(Object.values(priority_status))