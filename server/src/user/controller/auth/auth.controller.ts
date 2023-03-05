import { Request, Response } from "express";
import { LoginResponseDto } from "../../entities/user/dto/login-user.dto";
import { AuthService } from "../../services/auth/auth.service";
import { GoogleService } from "../../services/auth/oauth2/google/google.service";


export class AuthController{


    constructor(private authService: AuthService, private googleService: GoogleService){}

    public async login(req: Request, res: Response): Promise<LoginResponseDto>{
        return await this.authService.login(req.body.username, req.body.password)
    }

    public async loginWithGoogle(req: Request, res: Response): Promise<void>{
        try{         
            const token = await this.googleService.login(req.query.code as string)
            res.redirect('http://localhost:5173/waiting-for-user?token=' + token.token)
        }catch(e){ res.redirect('http://localhost:5173/auth-error') }
    }

}