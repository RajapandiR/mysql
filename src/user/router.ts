import express, { NextFunction, Request } from 'express';
import { Controller } from './controller';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: any) => {
        cb(null, "./uploads")
    },
    filename: (req: Request, file: Express.Multer.File, cb: any) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage });
const app = express.Router();

app.post('/', upload.single("file"), (req, res) => {
    Controller.importData(req, res);
})

app.get('/', (req, res) => {
    Controller.getUsers(req, res);
})

app.get('/export', (req, res) => {
    Controller.exportData(req, res);
})

export const UserRouther = app;