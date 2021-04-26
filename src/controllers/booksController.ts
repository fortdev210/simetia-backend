import { RequestHandler } from "express";
import pool from "../dbconfig/dbconnector";

class BooksController {
  public getBooks: RequestHandler = async (req, res) => {
    try {
      const client = await pool.connect();
      const sql = "SELECT * FROM books";

      const { rows } = await client.query(sql);
      const books = rows;

      client.release();

      res.send(books);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  public addBook: RequestHandler = async (req, res) => {
    try {
      const client = await pool.connect();
      const sql =
        "INSERT INTO books (title, pub_year, description) VALUES ($1, $2, $3) returning *";
      const values = [req.body.title, req.body.pub_year, req.body.description];
      const { rows } = await client.query(sql, values);
      client.release();
      const books = rows;
      res.send(books);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  public removeBook: RequestHandler = async (req, res) => {
    try {
      const client = await pool.connect();
      const sql = "DELETE FROM books WHERE id=$1 returning *";
      const values = [req.body.id];
      const { rows } = await client.query(sql, values);
      const books = rows;
      res.send(books);
      client.release();
    } catch (error) {
      res.status(400).send(error);
    }
  };
}

export default BooksController;
