
import { Response, Request, NextFunction } from 'express';
import UserInterface from '../../interface/user/user.interface';
import { UserValidator } from '../../validate/validator';

export default class UserController {
  userService: UserInterface;

  constructor(userService: UserInterface) {
    this.userService = userService;
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedUser = new UserValidator(req.body);
      await this.userService.createUser(validatedUser);
      res.send({ message: 'user created successfully' });
    } catch (err) {
      next(err);
    }
  };
}
