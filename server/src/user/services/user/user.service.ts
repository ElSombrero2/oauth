import axios from "axios";
import mongoose from "mongoose";
import { FindUserDto } from "../../entities/user/dto/find-user.dto";
import { User } from '../../entities/user/user.entity'
import {  Responses, HttpResponse } from '../../../utils/responses/responses'
import { CreateUserDto } from "../../entities/user/dto/create-user.dto";

export class UserService{

    constructor(private Model: User){}

    public async create(dto: CreateUserDto): Promise<HttpResponse>{
        try{
            const user = new this.Model(dto)
            await user.save()
            return Responses.CREATED
        }catch(e){ throw Responses.INTERNAL_SERVER_ERROR }
    }

    public async findAll(): Promise<FindUserDto[]>{
        try{ return await this.Model.find({}, ['_id', 'username', 'email', 'picture']) as unknown as FindUserDto[] }
        catch(e){ throw Responses.INTERNAL_SERVER_ERROR }
    }

    public async findOne(id: string): Promise<FindUserDto>{
        try{ return await this.Model.findById(id) as unknown as FindUserDto }
        catch(e){ throw Responses.NOT_FOUND }
    }

}