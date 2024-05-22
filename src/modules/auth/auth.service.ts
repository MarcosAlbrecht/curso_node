import { NotFoundException } from '@exceptions/not-found-exception';
import { getUserByEmail } from '@modules/user/user.service';
import { generateToken } from '@utils/auth';
import { ValidatePassword } from '@utils/password';
import { AuthModel } from './auth.model';
import { AuthDTO } from './dtos/auth.dto';

export const validateAuth = async (authDTO: AuthDTO): Promise<AuthModel> => {
  const user = await getUserByEmail(authDTO.email);

  const isValidPassword = await ValidatePassword(authDTO.password, user.password);

  if (!isValidPassword) {
    throw new NotFoundException('User');
  }

  return new AuthModel(generateToken(user), user);
};
