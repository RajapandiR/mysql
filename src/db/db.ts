import mysql from "mysql2/promise";
import "dotenv/config"
console.log(process.env.HOST);
console.log(process.env.DBUSER);
console.log(process.env.PASSWORD);
console.log(process.env.DATABASE);

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

db.getConnection().then(() => console.log("Db Connected")).catch(() => console.log("not"));

export default db;