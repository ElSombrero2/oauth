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
import { GoogleService } from "./services/auth/oauth2/google/google.service";
import { GoogleApiClient, GoogleOauth2Client } from "../modules/client/client.module";

export function UserRouter(baseUrl: string){

    const router = express.Router()

    const jwtService = new JwtService(jwt)
    const userService = new UserService(UserModel)
    const authService = new AuthService(UserModel, bcrypt, jwtService)
    const googleService = new GoogleService(GoogleOauth2Client, GoogleApiClient, userService, jwtService)
    const userController = new UserController(userService)
    const authController = new AuthController(authService, googleService)

    router.post('/', (req, res) => handle(userController, 'create', req, res))
    router.get('/', (req, res) => handle(userController, 'findAll', req, res))
    router.get('/id/:id', (req, res) => handle(userController, 'findOne', req, res))
    router.get('/auth', (req, res) => handle(authController, 'login', req, res))
    router.get('/auth/google', (req, res) => handle(authController, 'loginWithGoogle', req, res))

    app.use(baseUrl, router)
    
}