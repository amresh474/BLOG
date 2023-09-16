import { createPool } from 'mysql2/promise';

const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

const pool = createPool(config);
export const connection = await pool.getConnection();