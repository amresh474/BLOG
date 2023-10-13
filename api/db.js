/* import { createPool } from 'mysql2/promise';

const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

const pool = createPool(config);
export const connection = await pool.getConnection(); */


// Postgres client setup
// const { Pool } = require("pg");
import pkg from 'pg';
const {Pool} = pkg;
const pgClient = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

pgClient.on("connect", client => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch(err => console.log("PG ERROR", err));
});
export const connection = pgClient;
