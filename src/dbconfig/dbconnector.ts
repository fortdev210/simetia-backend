
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export default new Pool ({
    max: 20,
    connectionString: 'postgres://postgres:root@127.0.0.1:5432/library',
    idleTimeoutMillis: 30000
});