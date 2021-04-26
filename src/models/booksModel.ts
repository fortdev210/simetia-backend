import pool from "../dbconfig/dbconnector";

class BooksModel {

    private createBooksModel = async () => {
        try {
            const queryText = `
            CREATE TABLE IF NOT EXISTS
            books (
                id  SERIAL PRIMARY KEY,
                title VARCHAR(128),
                pub_year INT,
                description TEXT
            );
            `
            const client = await pool.connect();
            await client.query(queryText)
            console.log(" [✔️] Books table created successfully.");
            client.release();
        } catch (error) {
            console.log(error)
        }
        
    }

    public init = () => {
        this.createBooksModel();
    }
}

export default BooksModel;