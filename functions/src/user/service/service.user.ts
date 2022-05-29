
import { User } from '../model/user.model';
import UserDatabase from '../database/database.user';
import UserInterface from '../../interface/user/user.interface';

export default class UserService implements UserInterface {
  userDatabase: UserDatabase;

  constructor() {
    this.userDatabase = new UserDatabase();
  }

  async createUser(user: User): Promise<void> {
    try {
      console.log('[service.user.ts] [createUser] - body: ' + JSON.stringify(user));
      await this.userDatabase.createUser(user);
      return;
    } catch (err) {
      throw err;
    }
  }
}
