import { HttpStatusCode } from "axios";


export const Exceptions = {
    INTERNAL_SERVER_ERROR: {
        status: HttpStatusCode.InternalServerError,
        message: 'Internal Server Error'
    },
    CREATED: {
        status: HttpStatusCode.Created,
        message: 'Created'
    },
    NOT_FOUND: {
        status: HttpStatusCode.NotFound,
        message: 'Not Found'
    }
}