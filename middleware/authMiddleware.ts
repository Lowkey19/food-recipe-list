import { Request, Response, Express, NextFunction } from 'express';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.status(401).json({
      "error": "UnauthorizedError",
      "message": "Error: User unauthorized.",
    })
  }
}