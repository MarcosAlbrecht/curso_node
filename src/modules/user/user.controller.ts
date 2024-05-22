import { NotFoundException } from '@exceptions/not-found-exception';
import { verifyToken } from '@utils/auth';
import { Request, Response, Router } from 'express';
import { ReturnError } from 'src/exceptions/return-error.dto';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { createUser, getUsers } from './user.service';
const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const authorization = req.headers.authorization;

    // Verify the token
    await verifyToken(authorization);

    // Fetch users
    const users = await getUsers();

    // Send the users as the response
    res.send(users);
  } catch (error) {
    if (error instanceof NotFoundException) {
      // No content to send back, 204 No Content
      res.status(204).send();
    } else {
      // Handle other errors
      new ReturnError(res, error);
    }
  }
});

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

export default userRouter;
