import { Request, Response } from "express";
import { HttpResponse } from "../../../utils/responses/responses";
import { FindUserDto } from "../../entities/user/dto/find-user.dto";
import { UserService } from "../../services/user/user.service";


export class UserController{

    constructor(private userService: UserService){}

    public async findAll(req: Request, res: Response): Promise<FindUserDto[]>{
        try{ return await this.userService.findAll() }
        catch(e){ throw e }
    }

}