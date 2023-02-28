import { app } from "./modules/app/app.module";

export async function main(){
    

    app.listen(process.env.PORT, () => console.log(`Listening to ${process.env?.PORT}`))
}