import { HttpStatusCode } from "axios";

export class HttpResponse{ 
    constructor(public  status: number, public message: string){}
}

export const Responses = {
    INTERNAL_SERVER_ERROR: new HttpResponse(HttpStatusCode.InternalServerError, 'Internal Server Error'),
    CREATED: new HttpResponse(HttpStatusCode.Created, 'Created'),
    NOT_FOUND: new HttpResponse(HttpStatusCode.NotFound, 'Not Found'),
    WRONG_PASSWORD: new HttpResponse(HttpStatusCode.NotAcceptable,'Wrong Password')
}