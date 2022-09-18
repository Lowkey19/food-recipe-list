declare module 'express-session' {
  interface Session {
    user: string;
    isAuth: boolean;
  }
}

import bcrypt from 'bcryptjs';
import { Request, Response, Express } from 'express';

import User from '../models/user';
import { isAuth } from '../middleware/authMiddleware';

const routes = (app: Express) => {
  app.post('/auth/register', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    let user = await User.find({ "$or": [{
      username,
      email,
    }] }).exec();

    if (user.length) {
      res.status(409).json({
        "error": "ConflictError",
        "message": "User already exists.",
      })
    }

    try {
      let passwordHash = await bcrypt.hash(password, 10);
  
      let newUser = new User({
        username,
        email,
        password: passwordHash,
      })
  
      await newUser.save();
  
      res.status(200).json({
        message: "User registered successfully.",
      })
    } catch (e) {
      res.status(400).json({
        "error": e,
        "message": "Error registering User data",
      })
    }
  });

  app.post('/auth/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).exec();

    if (!user) {
      res.status(401).json({
        "error": "UnauthorizedError",
        "message": "User not found.",
      })
    }

    try {
      if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = user.id;
        req.session.isAuth = true;

        res.status(200).json({
          id: user.id,
          username: user.username,
          email: user.email,
          session: req.session,
        });
      }
    } catch (e) {
      res.status(401).json({
        "error": e,
        "message": "Incorrect password.",
      })
    }
  });

  app.post('/auth/logout', async (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) throw err;
      res.clearCookie("session", { domain: 'localhost' });
      res.status(200).json({
        message: "User logged out successfully.",
      })
    })
  });

  app.get('/auth/userInfo', isAuth, async (req: Request, res: Response) => {
    const userId = req.session.user;
    const user = await User.findById(userId).exec();

    if (!user) {
      res.status(401).json({
        "error": "UnauthorizedError",
        "message": "User not found.",
      })
    }

    res.status(200).json({
      id: user?.id,
      username: user?.username,
      email: user?.email,
    });
  });
}

export default routes;
