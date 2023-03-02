import { app } from "./modules/app/app.module";
import { InitDatabase } from "./modules/database/database.module";
import { UserRouter } from "./user/user.router";

export async function main(){
    try{
        await InitDatabase(process.env.DATABASE || '')
        UserRouter('/user')
        app.listen(process.env.PORT, () => console.log(`Listening to ${process.env?.PORT}`))
    }catch(e){ throw e }
}