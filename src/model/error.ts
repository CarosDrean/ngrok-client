export interface MError {
    code: number
    error: any
    message: string
    where: string
}

export class Error implements MError {
    code: number;
    error: any;
    message: string
    where: string

    constructor(code: number, error: any, message: string = '', where: string) {
        this.code = code;
        this.error = error;
        this.message = message
        this.where = where
    }

    static voidError(): MError {
        return {code: 0, error: '', message: '', where: ''}
    }

    static isVoidError(error: MError): boolean {
        const voidError = Error.voidError()
        return error.code == voidError.code && error.error == voidError.error && error.message == voidError.message
    }
}
