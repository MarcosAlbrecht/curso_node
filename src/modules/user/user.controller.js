import { PrismaClient } from '@prisma/client/edge';
import { Router } from 'express';
const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.get('/', async function (req, res) {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();

  res.send(users);
});
router.get('/:nome', function (req, res) {
  res.send('nome: ' + req.params.nome);
});

export default userRouter;
