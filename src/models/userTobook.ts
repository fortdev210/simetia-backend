import pool from "../dbconfig/dbconnector";

class UserToBooks {

    private createUserToBooks = async () => {

        try {
            const queryText = `
            CREATE TABLE IF NOT EXISTS
            users_books (
                user_id  UUID ,
                book_id  INT
            );
            `
            const client = await pool.connect();
            await client.query(queryText);
            console.log(" [✔️] User-To-Book table created successfully.");
            client.release();
        } catch (error) {
            console.log(error)
        }
    }

    public init = () => {
        this.createUserToBooks();
    }
}

export default UserToBooks;