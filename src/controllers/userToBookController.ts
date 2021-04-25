import {RequestHandler} from "express";
import pool from "../dbconfig/dbconnector";


class UserToBooksController {
    
    public addBook: RequestHandler = async (req, res) => {
        const {uid} = req.params;
       
        if (!req.body.id) {
            return res.status(400).send({
              message: "Select the book you want to add.",
            });
        }
      
        try {
            const insertQuery = `INSERT INTO users_books (user_id, book_id) VALUES ($1, $2) returning *`;
            const client = await pool.connect();
            const values = [uid,req.body.id];
            const {rows} = await client.query(insertQuery, values);
            return res.status(201).send({ 'message':'Successfully inserted.' });
        } catch (error) {
            return res.status(400).send(error)
        }    
    }

    public getBooks: RequestHandler = async (req, res) => {
        const {uid} = req.params;
        try {
            const client = await pool.connect();
            const queryString = `SELECT * FROM books WHERE id IN (SELECT book_id FROM users_books WHERE user_id=$1);`;
            const values = [uid]
            const {rows} = await client.query(queryString,values);
            return res.status(200).send(rows);
        } catch (error) {
            return res.status(400).send(error)
        }
    }

    public removeBook: RequestHandler = async (req, res) => {
        const {uid} = req.params;
       
        if (!req.body.id) {
            return res.status(400).send({
              message: "Select the book you want to remove.",
            });
        }
      
        try {
            const insertQuery = `DELETE FROM users_books WHERE user_id=$1 AND book_id=$2;`;
            const client = await pool.connect();
            const values = [uid,req.body.id];
            const {rows} = await client.query(insertQuery, values);
            return res.status(201).send({ 'message':'Successfully removed.' });
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}

export default UserToBooksController;