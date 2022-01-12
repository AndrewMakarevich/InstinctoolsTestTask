class ApiError extends Error {
    code: number;
    message: string;
    constructor(code: number, message: string) {
        super(),
            this.code = code,
            this.message = message
    }
    static badRequest(message: string) {
        return new ApiError(400, message);
    }
}
export default ApiError;