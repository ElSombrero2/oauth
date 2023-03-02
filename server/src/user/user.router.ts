import { app } from "../modules/app/app.module";
import express from 'express'
import { handle } from "../utils/handler/handler";
import { UserController } from "./controller/user/user.controller";
import { UserService } from "./services/user/user.service";
import { UserModel } from "./entities/user/user.entity";
import { AuthController } from "./controller/auth/auth.controller";
import { AuthService } from "./services/auth/auth.service";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JwtService } from "./services/jwt/jwt.service";

export function UserRouter(baseUrl: string){

    const router = express.Router()

    const userService = new UserService(UserModel)
    const authService = new AuthService(UserModel, bcrypt, new JwtService(jwt))
    const userController = new UserController(userService)
    const authController = new AuthController(authService)

    router.post('/', (req, res) => handle(userController, 'create', req, res))
    router.get('/', (req, res) => handle(userController, 'findAll', req, res))
    router.get('/id/:id', (req, res) => handle(userController, 'findOne', req, res))
    router.get('/auth', (req, res) => handle(authController, 'login', req, res))

    app.use(baseUrl, router)
    
}