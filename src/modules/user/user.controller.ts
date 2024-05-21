import { NotFoundException } from '@exceptions/not-found-exception';
import { Request, Response, Router } from 'express';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { createUser, getUsers } from './user.service';
const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.get('/', async (_, res: Response): Promise<void> => {
  const users = await getUsers().catch((error) => {
    if (error instanceof NotFoundException) {
      res.status(204);
    } else {
      res.status(500).send(error.message);
    }
  });

  res.send(users);
});

router.post(
  '/',
  async (req: Request<undefined, undefined, UserInsertDTO>, res: Response): Promise<void> => {
    console.log(req.body);
    const user = await createUser(req.body);
    res.send(user);
  },
);

export default userRouter;
