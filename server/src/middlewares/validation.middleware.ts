import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// @desc  Finds the validation errors in this request and wraps them in an object with handy functions
const validatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      data: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validation_errors: errors.array().reduce((acc: any, current: any) => {
          // Check if an existing entry exists for the path
          const existingEntry = acc[current.path];

          // If it exists, combine messages with a newline
          if (existingEntry) {
            acc[current.path] = `${existingEntry}. ${current.msg}`;
          } else {
            // If it's new, create an entry with path and message
            acc[current.path] = current.msg;
          }

          return acc;
        }, {}),
      },
      // .map((err) => err.msg)
      // .join(', '),
    });
  }
  next();
};

export default validatorMiddleware;
