import { NotFoundException } from '@exceptions/not-found-exception';
import { ReturnError } from '@exceptions/return-error.dto';
import { authMiddleware } from '@middlewares/auth.middleware';
import { Request, Response, Router } from 'express';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { createUser, getUsers } from './user.service';
const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.post(
  '/',
  async (req: Request<undefined, undefined, UserInsertDTO>, res: Response): Promise<void> => {
    console.log(req.body);
    const user = await createUser(req.body).catch((error) => {
      new ReturnError(res, error);
    });
    res.send(user);
  },
);

router.use(authMiddleware);

router.get('/', async (req: Request, res: Response): Promise<void> => {
  // const authorization = req.headers.authorization;

  // verifyToken(authorization).catch((error) => {
  //   new ReturnError(res, error);
  // });

  const users = await getUsers().catch((error) => {
    if (error instanceof NotFoundException) {
      res.status(204);
    } else {
      new ReturnError(res, error);
    }
  });

  res.send(users);
});

export default userRouter;
