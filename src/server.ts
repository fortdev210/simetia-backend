import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';
import booksRouter from './routers/booksRouter';
import usersRouter from './routers/usersRouter';
import pool from './dbconfig/dbconnector';
import UserModel from './models/userModel';
import BooksModel from './models/booksModel';
import UserToBooks from './models/userTobook';

class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.routerConfig();
        this.dbConnect();
        this.init_db();
    }

    private config() {
        this.app.use(bodyParser.urlencoded({ extended:true }));
        this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
    }

    private dbConnect() {
        pool.connect(function (err, client, done) {
            if (err) return console.error(err);
            console.log('Connected');
          }); 
    }

    private init_db() {
        const users:UserModel = new UserModel();
        const books:BooksModel = new BooksModel();
        const userToBooks = new UserToBooks();
        users.init();
        books.init();
        userToBooks.init();
    }

    private routerConfig() {
        this.app.use('/books', booksRouter);
        this.app.use('/users', usersRouter);
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err))
        });
    }
}

export default Server;