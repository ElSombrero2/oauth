import { Request, Response } from "express";


export async function handle(controller: any, name: string, req: Request, res: Response){
    try{ res.json(await controller[name](req, res))  }
    catch(e: any){
        if(e.status) res.status(e.status)
        res.json(e)
    }
}