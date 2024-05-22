import { UserModel } from '@modules/user/user.model';
import { getUserByEmail } from '@modules/user/user.service';
import { AuthDTO } from './dtos/auth.dto';

export const validateAuth = async (authDTO: AuthDTO): Promise<UserModel> => {
  const user = await getUserByEmail(authDTO.email);

  return user;
};
