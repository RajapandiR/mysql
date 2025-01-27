import express, {NextFunction, Response, Request} from "express";
import "dotenv/config";
import { AuthRouter, UserRouther } from "./src/helpers/paths";
import { AuthMiddleware } from "./src/middleware/authMiddleware";
const app = express();
app.use(express.json());
const port = process.env.PORT;
console.log(port);


app.use("/api/auth", AuthRouter);
app.use('/api/users', AuthMiddleware.loginMiddleware, UserRouther);

app.use(function(req, res, next) {
    res.status(404).json({error: "mes"})
    next();
  });

app.listen(port, () => {
    console.log(`Server on ${port}`);

})