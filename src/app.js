import express from 'express';
import { routerLoader } from './routerLoader.js';

const app = express();

app.use(express.json());

// app.use(userRouter);
// app.use(productRouter);
routerLoader(app);

app.listen(8080, function () {
  console.log('Servidor rodando');
});
