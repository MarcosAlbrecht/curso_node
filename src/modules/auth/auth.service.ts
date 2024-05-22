import { NotFoundException } from '@exceptions/not-found-exception';
import { UserModel } from '@modules/user/user.model';
import { getUserByEmail } from '@modules/user/user.service';
import { ValidatePassword } from '@utils/password';
import { AuthDTO } from './dtos/auth.dto';

export const validateAuth = async (authDTO: AuthDTO): Promise<UserModel> => {
  const user = await getUserByEmail(authDTO.email);

  const isValidPassword = await ValidatePassword(authDTO.password, user.password);

  if (!isValidPassword) {
    throw new NotFoundException('User');
  }

  return user;
};
