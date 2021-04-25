import pool from "../dbconfig/dbconnector";

class BooksModel {

    private createBooksModel = async () => {
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
        client.query(queryText)
        .then((res:any) => {
            console.log("Books table created successfully.");
        })
        .catch((err:any) => {
            console.log(err);
        });
    }

    public init = () => {
        this.createBooksModel();
    }
}

export default BooksModel;