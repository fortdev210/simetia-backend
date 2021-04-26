import pool from "../dbconfig/dbconnector";

class UserModel {

    private createUserTable = async () => {
        try {
            const queryText = `
            CREATE TABLE IF NOT EXISTS
            users (
                id UUID PRIMARY KEY,
                email VARCHAR(128) UNIQUE NOT NULL,
                password VARCHAR(128) NOT NULL,
                is_admin BOOL,
                created_date TIMESTAMP,
                modified_date TIMESTAMP
            );
            `
            const client = await pool.connect();
            await client.query(queryText);
            console.log("[✔️] User table created successfully.");
            client.release();
        } catch (error) {
             console.log(error);
        }
    }

    public init = () => {
        this.createUserTable();
    }
}

export default UserModel;