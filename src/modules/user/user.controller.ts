import { NotFoundException } from '@exceptions/not-found-exception';
import { ReturnError } from '@exceptions/return-error.dto';
import { authAdminMiddleware } from '@middlewares/auth-admin.middleware';
import { Request, Response, Router } from 'express';
import { UserEditPasswordDTO } from './dtos/user-edit-password.dto';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { createUser, editPassword, getUsers } from './user.service';

const createUserController = async (
  req: Request<undefined, undefined, UserInsertDTO>,
  res: Response,
): Promise<void> => {
  console.log(req.body);
  const user = await createUser(req.body).catch((error) => {
    new ReturnError(res, error);
  });
  res.send(user);
};

const getUsersController = async (req: Request, res: Response): Promise<void> => {
  const users = await getUsers().catch((error) => {
    if (error instanceof NotFoundException) {
      res.status(204);
    } else {
      new ReturnError(res, error);
    }
  });

  res.send(users);
};

const editPasswordController = async (
  req: Request<undefined, undefined, UserEditPasswordDTO>,
  res: Response,
): Promise<void> => {
  const user = await editPassword(7, req.body).catch((error) => {
    new ReturnError(res, error);
  });

  res.send(user);
};

const userRouter = Router();
const router = Router();

userRouter.use('/user', router);

router.post('/', createUserController);
router.use(authAdminMiddleware);
router.patch('/', editPasswordController);
router.use(authAdminMiddleware);
router.get('/', getUsersController);

export default userRouter;
