import { Request, Response } from "express";
import { HttpResponse } from "../../../utils/responses/responses";
import { FindUserDto } from "../../entities/user/dto/find-user.dto";
import { UserService } from "../../services/user/user.service";


export class UserController{

    constructor(private userService: UserService){}

    public async create(req: Request, res: Response){
        return await this.userService.create(req.body)
    }

    public async findAll(req: Request, res: Response): Promise<FindUserDto[]>{
        return await this.userService.findAll()
    }

    public async findOne(req: Request, res: Response): Promise<FindUserDto>{
        return await this.userService.findOne(req.params.id)
    }

}