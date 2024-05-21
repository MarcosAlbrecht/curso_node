import { Response, Router } from 'express';

const productRouter = Router();

const router = Router();

productRouter.use('/product', router);

router.get('/', (_, res: Response): void => {
  res.send('produto: ');
});

export default productRouter;
