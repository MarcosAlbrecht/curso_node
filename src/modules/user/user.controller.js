import { Router } from 'express';

const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.get('/', function (req, res) {
  res.send('Hellow World Now');
});
router.get('/:nome', function (req, res) {
  res.send('nome: ' + req.params.nome);
});

export default userRouter;
