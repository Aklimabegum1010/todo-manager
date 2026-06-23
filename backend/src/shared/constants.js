export const validation = Object.freeze({
    nameMaxLength: 50,
    passwordMinLength: 6,
    bcrypt_salt_rounds: 12,
    title_max_Length: 100,
    description_max_Length: 300

})

export const http_status = {
    created: 201,
    ok: 200,
    conflict: 409,
    unauthorized: 401,
    internal_server_error:500
}