import express, {Router} from 'express';
import BooksController from '../controllers/booksController';

const router = Router();
const booksController = new BooksController();

router.get('/', booksController.getBooks);
router.post('/add', booksController.addBook);

export default router;
