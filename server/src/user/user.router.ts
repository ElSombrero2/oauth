import { app } from "../modules/app/app.module";
import express from 'express'
import { handle } from "../utils/handler/handler";
import { UserController } from "./controller/user/user.controller";
import { UserService } from "./services/user/user.service";
import { UserModel } from "./entities/user/user.entity";

export function UserRouter(baseUrl: string){
    const router = express.Router()

    const userService = new UserService(UserModel)
    const userController = new UserController(userService)

    router.get('/', (req, res) => handle(userController, 'findAll', req, res))

    app.use(baseUrl, router)
}