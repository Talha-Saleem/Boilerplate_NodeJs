
import { userCollection } from '../../config/constants/collections.constants';
import { admin } from '../../config/firebase.includes';
import { HTTP500Error } from '../../error/baseError';
import { User } from '../model/user.model';

export default class UserDatabase {
  async createUser(user: User): Promise<void> {
    try {
      await userCollection.add(user);
      await admin.auth().setCustomUserClaims(user.uid, { role: user.role });
      return;
    } catch (err) {
      throw new HTTP500Error('Internal Server Error');
    }
  }
}
