import moment from "moment";
import { RequestHandler } from "express";
import { uuid } from "uuidv4";
import Helper from "../helpers/helper";
import pool from "../dbconfig/dbconnector";

class UserController {
  private helper: Helper;

  constructor() {
    this.helper = new Helper();
  }

  public create: RequestHandler = async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: "Email or Passoword missing.",
      });
    }

    if (!this.helper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        message: "Invalid Email",
      });
    }

    const hashPassword = this.helper.hashPassword(req.body.password);

    //--- Set the 1st registered user as admin ---//
    const countQuery = "SELECT COUNT(*) FROM users;";
    let is_admin = false;
    try {
      const client = await pool.connect();
      const { rows } = await client.query(countQuery);

      if (rows[0].count === "0") is_admin = true;
    } catch (error) {
      return res.status(400).send(error);
    }

    const createQuery = `
      INSERT INTO  users (id, email, password,is_admin, created_date, modified_date)
            VALUES ($1, $2, $3, $4, $5, $6)
            returning *`;

    const values = [
      uuid(),
      req.body.email,
      hashPassword,
      is_admin,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const client = await pool.connect();
      const { rows } = await client.query(createQuery, values);
      const token = this.helper.generateToken(rows[0].id);
      client.release();
      return res.status(201).send({ token });
    } catch (error) {
      if (error.routine === "_bt_check_unique") {
        return res
          .status(400)
          .send({ message: "User with that EMAIL already exist" });
      }
      await pool.end();
      return res.status(400).send(error);
    }
  };

  public login: RequestHandler = async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .send({ message: "Email and Password cant be empty." });
    }
    if (!this.helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ message: "Invalid email." });
    }

    const query = "SELECT * FROM users WHERE email = $1";

    try {
      const client = await pool.connect();
      const { rows } = await client.query(query, [req.body.email]);

      if (!rows[0]) {
        return res
          .status(400)
          .send({ message: "No user found with that email." });
      }

      if (!this.helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ message: "Incorrect password." });
      }

      const token = this.helper.generateToken(rows[0].id);
      rows[0].token = token;
      client.release();
      return res.status(200).send(rows[0]);
    } catch (error) {
      await pool.end();
      return res.status(400).send(error);
    }
  };

  public remove: RequestHandler = async (req, res) => {
    const deleteQuery = "DELETE FROM users WHERE id=$1 returning *";

    try {
      const client = await pool.connect();
      const { rows } = await client.query(deleteQuery, [req.body.id]);
      client.release();
      if (!rows[0]) {
        return res.status(404).send({ message: "user not found" });
      }
      return res.status(204).send({ message: "removed user successfully." });
    } catch (error) {
      await pool.end();
      return res.status(400).send(error);
    }
  };
}

export default UserController;
