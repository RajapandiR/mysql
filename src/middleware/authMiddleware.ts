
import db from '../db/db';
import { Responder, Request, Response, JWT, NextFunction, Utils } from '../helpers/paths';
class Middleware {

    loginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const { authorization } = req.headers;
        if(!authorization) return Responder.sendFailureMessage("Unauth", res);

        const {email}: any = await JWT.varifyToken(authorization.split(' ')[1]);
        console.log(email);
        const user: any = await Utils.getEmailData(email);        
        if(!user) return Responder.sendFailureMessage("user not found", res);
        // req.user = user;
        next();
        } catch(err:any) {
            console.log(err);
            
            return Responder.sendFailureMessage(err.message, res);
        }
        
    }
}

export const AuthMiddleware = new Middleware();