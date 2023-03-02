import { AxiosInstance } from "axios";
import QueryString from 'querystring'

export class GoogleService{

    constructor(private googleOauth2Client: AxiosInstance, private googleApiClient: AxiosInstance){}

    public async handle(code: string){
        try{
            const query = QueryString.stringify({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: 'code'
            })
            const res = await this.googleOauth2Client(`/token?${code}`)
            console.log(res.data.access_token)
        }catch(e){ throw e }
    }


}