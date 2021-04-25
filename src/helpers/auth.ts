import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import pool from "../dbconfig/dbconnector";

class AuthController {
    public verifyToken: RequestHandler = async (req, res, next) => {
        const token = req.headers['x-access-token'] as string;
        const key = process.env.SECRET as string;
        if (!token) {
            return res.status(400).send({'message':'Token is not provided.'});
        }

        try {
            const client = await pool.connect();
            const decoded = jwt.verify(token, key);
            const query = 'SELECT * FROM users WHERE id=$1';
            const {rows} = await client.query(query, [decoded]);
            if(!rows[0]) {
                return res.status(400).send({ 'message': 'Invalid token.' });
            }
            req.user = { id: decoded };
            next();
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

export default AuthController;