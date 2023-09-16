import { createPool } from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    password: 'Amresh@#$474',
    database: 'blog'
}

const pool = createPool(config);
export const connection = await pool.getConnection();