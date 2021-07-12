export interface Error {
    status: number
    error: any
    message?: string
    where?: string
    data?: any
}

export class UtilError {
    static voidError(): Error {
        return {status: 0, error: '', message: '', where: '', data: ''}
    }

    static isVoidError(error: Error): boolean {
        const voidError = UtilError.voidError()
        return error.status == voidError.status && error.error == voidError.error && error.message == voidError.message
    }
}
