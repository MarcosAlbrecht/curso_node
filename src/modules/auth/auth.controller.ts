import { ReturnError } from '@exceptions/return-error.dto';
import { Request, Response, Router } from 'express';
import { validateAuth } from './auth.service';
import { AuthDTO } from './dtos/auth.dto';

const auth = async (req: Request<undefined, undefined, AuthDTO>, res: Response): Promise<void> => {
  const user = await validateAuth(req.body).catch((error) => {
    new ReturnError(res, error);
  });

  res.send(user);
};

const authRouter = Router();

const router = Router();

authRouter.use('/auth', router);
router.post('/', auth);

export default authRouter;
