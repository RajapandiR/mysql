import { Request, Response } from "express"
import db from "../db/db";
import { Responder } from "../helpers/responder";
import { Utils } from "../helpers/utils";
import { JWT } from "../helpers/jwt";
import { uuidv4 } from "../helpers/paths";
class Auth {

    createuser = async (req: Request, res: Response) => {
        const data = req.body;
        console.log(data);

        // const existuser: any = await Utils.getEmailData(data.email);
        // if (existuser) return Responder.sendFailureMessage("User already Exist", res);
        const user = await db.query(`INSERT INTO users (id, email, password) values (?, ?, ?)`, [uuidv4(), data.email, await Utils.hashPassword(data?.password)]);
        if (user) return Responder.sendSuccessMessage("User Created", res);
        else return Responder.sendFailureMessage("unable create user", res);
    }

    login = async (req: Request, res: Response) => {
        const data = req.body;
        const [existuser]: any = await db.query(`SELECT * FROM users WHERE email = ?`, data.email);
        const user = existuser[0]
        if (!user) return Responder.sendFailureMessage("User not found", res);
        console.log(existuser);
        const vaildPwd = await Utils.comparePwd(data.password, user?.password);
        if (!vaildPwd) return Responder.sendFailureMessage("Invalid credentials", res);
        const token = await JWT.issueToken({email:user.email});
        Responder.sendSuccessDataMessage({ token }, "login", res);
        // if (user) return Responder.sendSuccessMessage("User Created", res);
        // else return Responder.sendFailureMessage("unable create user", res);
    }
}

export const Controller = new Auth()