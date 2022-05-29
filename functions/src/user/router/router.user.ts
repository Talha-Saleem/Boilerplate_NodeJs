
import express from 'express';
import UserInterface from '../../interface/user/user.interface';
import UserController from '../controller/controller.user';

export default function userRouter(userService:UserInterface) {
  const app = express();
  const userController = new UserController(userService);

  app.post('/create', userController.createUser);

  return app;
}
