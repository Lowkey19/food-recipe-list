import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import MongoDBSession from 'connect-mongodb-session';

import authRoutes from './routes/authRoutes';
import foodRecipeRoutes from './routes/foodRecipeRoutes';
import database from './database';

dotenv.config();

export const app = express();

const MongoStore = MongoDBSession(session);
const store = new MongoStore({
  uri: database.uri,
  collection: 'mySessions',
})

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.json());

app.use(session({
  name: 'session',
  secret: process.env.SECRET_KEY || 'sampleSecret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    secure: false,
  },
  saveUninitialized: false,
  resave: false,
  store: store,
}))

authRoutes(app);
foodRecipeRoutes(app);

// app.use(express.static(path.join(__dirname, "client", "build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

database.connect(() => {
  app.listen(process.env.PORT, () => console.log(`Express server has started on port ${process.env.PORT}`));
})

