
import { User } from '../../user/model/user.model';

export default interface UserInterface{
    createUser(user:User):Promise<void>;
}

