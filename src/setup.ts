import pool from "./dbconfig/dbconnector";

const createBooksTable = async () => {
  try {
    const queryText = `
        CREATE TABLE IF NOT EXISTS
        books (
            id  SERIAL PRIMARY KEY,
            title VARCHAR(128),
            pub_year INT,
            description TEXT
        );
    `;
    const client = await pool.connect();
    client.query(queryText);
    console.log(" [✔️] Books table created successfully.");
    const queryString = `
            INSERT INTO 
                books (title, pub_year, description) 
            VALUES 
                (
                    'Nodejs',
                    2021,
                    'Good book for learning nodejs'
                ),
                (
                    'Full NestJS',
                    2021,
                    'Full Course of Nest, backend by nest'
                ),
                (
                    'Reack Hooks',
                    2021,
                    'Full Stack MERN with React'
                );   
        `;
    await client.query(queryString);
    console.log("[✔️] Added books table successfully");
    await pool.end();
  } catch (error) {
    console.error(error);
    await pool.end();
  }
};



(async () => {
  await createBooksTable();
})();
