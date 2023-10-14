import { createPool } from 'mysql2/promise';
import dotenv from "dotenv";
dotenv.config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}
console.log("config",config);

const pool = createPool(config);
export const connection = await pool.getConnection();


// Postgres client setup
// const { Pool } = require("pg");
/* import pkg from 'pg';
const {Pool} = pkg;
const pgClient = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}); */
/* 
pgClient.on("connect", client => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch(err => console.log("PG ERROR", err));
});
export const connection = pgClient; */
