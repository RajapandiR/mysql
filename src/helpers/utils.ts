import bcrypt from "bcrypt";
import db from "../db/db";
class UtilsClass {
    hashPassword = async (pwd: string) => {
        console.log(pwd);
        
        const salt = await bcrypt.genSalt(10)
        console.log(pwd, salt);
        
        return await bcrypt.hash(pwd, salt);
    }

    comparePwd = (pwd:string, hashPwd: string) => {
        return bcrypt.compare(pwd, hashPwd);
    }

    getEmailData = async (email:string) => {
        const [user]:any =  await db.query(`SELECT email FROM users WHERE email = ?`, email);  
        return user[0]
    }
 
}

export const Utils = new UtilsClass();