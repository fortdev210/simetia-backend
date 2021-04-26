import express, {Router} from 'express';
import BooksController from '../controllers/booksController';
import AuthController from '../helpers/auth';

const router = Router();
const booksController = new BooksController();
const auth = new AuthController()

router.get('/', booksController.getBooks);
router.post('/add',auth.verifyAdmin, booksController.addBook);
router.post('/remove',auth.verifyAdmin, booksController.removeBook);

export default router;
