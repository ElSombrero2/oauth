import { Request, Response } from "express";


export function handle(controller: any, name: string, req: Request, res: Response){
    try{ res.json(controller[name]()) }
    catch(e: any){
        if(e.status) res.sendStatus(e.status)
        res.json(e) 
    }
}