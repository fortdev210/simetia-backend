import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import pool from "../dbconfig/dbconnector";

interface DECODE {
    userId: string, 
    iat:number,
    exp:number,
}
class AuthController {
  
    public  verifyToken: RequestHandler = async (req, res, next) => {
        const token = req.headers['x-access-token'] as string;
        const key = process.env.SECRET as string;
       
        if (!token) {
            return res.status(400).send({'message':'Token is not provided.'});
        }

        try {
            const client = await pool.connect();
            const decoded = jwt.verify(token, key) as DECODE;
            const query = 'SELECT * FROM users WHERE id=$1';
            const {rows} = await client.query(query, [decoded.userId]);
            if(!rows[0]) {
                return res.status(400).send({ 'message': 'Invalid token.' });
            }
            req.user = { id: decoded };
            next();
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    public verifyAdmin: RequestHandler = async (req, res, next) => {
        const token = req.headers['x-access-token'] as string;
        const key = process.env.SECRET as string;
       
        if (!token) {
            return res.status(400).send({'message':'Token is not provided.'});
        }

        try {
            const client = await pool.connect();
            const decoded = jwt.verify(token, key) as DECODE;
            const query = 'SELECT * FROM users WHERE id=$1';
            const {rows} = await client.query(query, [decoded.userId]);
            if(!rows[0]) {
                return res.status(400).send({ 'message': 'Invalid token.' });
            }
            if (!rows[0].is_admin) {
                return res.status(400).send({ 'message': 'Only admin is allowed for this action.' });
            }
            req.user = { id: decoded };
            next();
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

export default AuthController;