import path from "path";
import db from "../db/db";
import { csvParser, fs, Request, Responder, Response, uuidv4, csv } from "../helpers/paths";
class UserController {
    importData = (req: Request, res: Response) => {
        console.log(req.file?.path);
        const file: any = req.file?.path;
        const raja:any = [];
        fs.createReadStream(process.cwd() + "/" + file)
        .pipe(csv.parse({headers: true}))
            .on('data', async (row) => {
                console.log(row);
                raja.push(row);
                await db.query(`INSERT INTO stud SET ? `, { "id": uuidv4(), ...row })
            })
            .on('end', () => {
                fs.unlink(file, () => { })
                console.log(raja);
                
                Responder.sendSuccessMessage("Import Data", res);
            })
            // .on('error')
    }

    getUsers = async (req: Request, res: Response) => {
        let { page, limit }: any = req.query;
        page = Number(page) || 1
        limit = Number(limit) || 10
        var skip: any = (page - 1) * limit;

        const [users]: any = await db.query('SELECT id, name, age, class, createdAt FROM stud ORDER BY id DESC LIMIT ? OFFSET ? ', [limit, skip]);
        if (users) Responder.sendSuccessDataMessage({ users: users }, 'Users', res);
        else Responder.sendFailureMessage("unable get users", res);
    }

    exportData = async (req: Request, res: Response) => {
        console.log(req.file?.path);
        const file: any = req.file?.path;
        let [users]:any = await db.query('SELECT * FROM stud');
        let ws = fs.createWriteStream(process.cwd() + "/" + "output.csv")
        csv
            .write(users, { headers: true })
            .on("finish",() => {
                Responder.sendSuccessMessage("Export users", res);
             })
            .pipe(ws);
    }
}

export const Controller = new UserController();