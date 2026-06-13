export class ApiResponse{
    constructor(statusCode, data, message = 'success') {
        this.success = statusCode < 400
        this.statusCode = statusCode
        this.message = message
        this.data = data
    }
    send(res){
        return res.status(this.statusCode).json(this)
    }
}