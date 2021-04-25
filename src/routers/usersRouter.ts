import express, {Router} from 'express';
import UserController from '../controllers/usersController';
import UserToBooksController from '../controllers/userToBookController';
import AuthController from '../helpers/auth';

const router = Router();
const userController = new UserController();
const userToBookController = new UserToBooksController();
const auth = new AuthController();


router.post('/signup', userController.create);
router.post('/login', userController.login);
router.post('/:uid/add/', auth.verifyToken, userToBookController.addBook);
router.post('/:uid/remove/',auth.verifyToken, userToBookController.removeBook);
router.get('/:uid/', auth.verifyToken,userToBookController.getBooks);

export default router;
