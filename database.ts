import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  public uri: string;

  constructor() {
    this.uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.zgrhe4p.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
  }

  public connect(appListen: () => void) {
    // When successfully connected
    mongoose.connection.on('connected', () => {
      // eslint-disable-next-line no-console
      console.log(`Connected to ${process.env.DATABASE} DB.`);

      appListen();
    });

    // If the connection throws an error
    mongoose.connection.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.log('Mongoose default connection error.', err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
      // eslint-disable-next-line no-console
      console.log('Mongoose default connection disconnected.');
    });

    const gracefulExit = () => {
      mongoose.connection.close(() => {
        // eslint-disable-next-line no-console
        console.log(
          'Mongoose default connection disconnected through app termination.',
        );
        process.exit(0);
      });
    };

    process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

    try {
      mongoose.connect(this.uri);
      // eslint-disable-next-line no-console
      console.log(`Trying to connect to ${process.env.DATABASE} DB.`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Server initialization failed.', (error as Error).message);
    }
  }
}

export default new Database();
