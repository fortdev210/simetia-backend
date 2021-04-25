import pool from "../dbconfig/dbconnector";

class UserModel {

    private createUserTable = async () => {
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
        client.query(queryText)
        .then((res:any) => {
            console.log("User table created successfully.");
        })
        .catch((err:any) => {
            console.log(err);
        });
    }

    public init = () => {
        this.createUserTable();
    }
}

export default UserModel;