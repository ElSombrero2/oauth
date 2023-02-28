import { app } from "../modules/app/app.module";


export function UserRouter(baseUrl: string){

    app.route(baseUrl)
    .get((req, res) => res.json({message: 'Cool'}))

}