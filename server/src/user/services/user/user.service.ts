import axios from "axios";
import mongoose from "mongoose";
import { FindUserDto } from "../../entities/user/dto/find-user.dto";
import { User } from '../../entities/user/user.entity'
import {  Exceptions } from '../../../utils/exceptions/exceptions'

export class UserService{

    constructor(private Model: mongoose.Model<User>){}

    public async findAll(): Promise<FindUserDto>{
        try{ return await this.Model.find({}, ['_id', 'username', 'email', 'picture']) as unknown as FindUserDto }
        catch(e){ throw Exceptions.INTERNAL_SERVER_ERROR }
    }
}