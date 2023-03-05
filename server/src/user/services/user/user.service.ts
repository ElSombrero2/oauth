
import { FindUserDto } from "../../entities/user/dto/find-user.dto";
import { User } from '../../entities/user/user.entity'
import {  Responses, HttpResponse } from '../../../utils/responses/responses'
import { CreateUserDto, CreateUserOauth2Dto } from "../../entities/user/dto/create-user.dto";
import { AuthTypes } from "../../../utils/auth-types";

export class UserService{

    constructor(private Model: User){}

    public async create(dto: CreateUserDto): Promise<HttpResponse>{
        try{
            if(!dto.password) throw null
            const user = new this.Model(dto)
            await user.save()
            return Responses.CREATED
        }catch(e){ throw Responses.INTERNAL_SERVER_ERROR }
    }

    public async createWithOauth2(username: string, email: string, picture: string): Promise<FindUserDto>{
        try{
            const user = new this.Model({username, email, picture, type: AuthTypes.GOOGLE})
            await user.save()
            return user as unknown as FindUserDto
        }catch(e){ throw Responses.INTERNAL_SERVER_ERROR }
    }

    public async findAll(): Promise<FindUserDto[]>{
        try{ return await this.Model.find({}, ['_id', 'username', 'email', 'picture']) as unknown as FindUserDto[] }
        catch(e){ throw Responses.INTERNAL_SERVER_ERROR }
    }

    public async findOne(id: string): Promise<FindUserDto>{
        try{ return await this.Model.findById(id, ['_id', 'username', 'email', 'picture']) as unknown as FindUserDto }
        catch(e){ throw Responses.NOT_FOUND }
    }

    public async findByEmail(email: string): Promise<FindUserDto>{
        try{ return await this.Model.findOne({email}, ['_id', 'username', 'email', 'picture']) as unknown as FindUserDto }
        catch(e){ throw Responses.NOT_FOUND }
    }

}