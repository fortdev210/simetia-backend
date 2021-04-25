import pool from "../dbconfig/dbconnector";

class UserToBooks {

    private createUserToBooks = async () => {
        const queryText = `
            CREATE TABLE IF NOT EXISTS
            users_books (
                user_id  UUID REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
                book_id  INT REFERENCES books (id) ON UPDATE CASCADE ON DELETE CASCADE,
                CONSTRAINT user_boo_pkey PRIMARY KEY (user_id, book_id)
            );
        `
        const client = await pool.connect();
        client.query(queryText)
        .then((res:any) => {
            console.log("User-To-Book table created successfully.");
        })
        .catch((err:any) => {
            console.log(err);
        });
    }

    public init = () => {
        this.createUserToBooks();
    }
}

export default UserToBooks;