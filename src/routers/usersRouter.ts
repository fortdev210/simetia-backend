import express, {Router} from 'express';
import UserController from '../controllers/userscontroller';

const router = Router();
const userController = new UserController();


router.post('/signup', userController.create);
router.post('/login', userController.login)


export default router;
