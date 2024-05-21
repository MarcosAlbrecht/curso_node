import { Router } from 'express';
import { createUser, getUsers } from './user.service';
const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.get('/', async (req, res) => {
  const users = await getUsers();

  res.send(users);
});

router.post('/', async (req, res) => {
  console.log(req.body);
  const user = await createUser(req.body);
  res.send(user);
});

export default userRouter;