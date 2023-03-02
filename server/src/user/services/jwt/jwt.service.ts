import _jwt from 'jsonwebtoken'

type Jwt = typeof _jwt

export class JwtService{

    constructor(private jwt: Jwt){}

    public sign(payload: any, expiresIn: number = 3600): string{
        return this.jwt.sign(payload, process.env.KEY as string, {expiresIn})
    }

    public verify(token: string): any | null {
        try{ return this.jwt.verify(token, process.env.KEY as string) }
        catch(e){ return null }
    }
}