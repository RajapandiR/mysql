import { Response } from "express"
interface ResultWithMsg  {
    success: boolean,
    message: string,

}
interface sendFailureMsg  {
    success: boolean,
    message: string,
}
class ResponderClass {

    sendSuccessMessage = (msg: string, res: Response) => {
        let result : ResultWithMsg = {
            success: true,
            message: msg
        }
        res.setHeader("content-type", 'application/json');
        res.end(JSON.stringify(result));
    }


    sendFailureMessage = (msg: string, res: Response) => {
        let result : ResultWithMsg = {
            success: false,
            message: msg
        }
        res.setHeader("content-type", 'application/json');
        res.end(JSON.stringify(result));
    }

    sendSuccessDataMessage = (data:any,msg: string, res: Response) => {
        let result  = {
            success: true,
            message: msg,
            data: data
        }
        res.setHeader("content-type", 'application/json');
        res.end(JSON.stringify(result));
    }
}

export const Responder = new ResponderClass();