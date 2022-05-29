import { Request,Response,NextFunction } from "express";
import { BaseError } from "./baseError";

function apiErrorHandler(err:any,req:Request,res:Response,next:NextFunction) {
    if(err instanceof BaseError){
        // res.send({
        //  });
        res.sendStatus(err.httpCode).send({message:err.message})
        return;
    }

    res.status(500).send('Something went wrong!!!')

}

export {apiErrorHandler};