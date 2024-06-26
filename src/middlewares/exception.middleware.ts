import { ReturnError } from '@exceptions/return-error.dto';
import { NextFunction, Request, Response } from 'express';

export const exceptionHandleMiddleware = (
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    return next(error);
  }

  new ReturnError(res, error);
};
