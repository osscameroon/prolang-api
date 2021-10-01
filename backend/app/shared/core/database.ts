import mongoose, { ConnectOptions } from 'mongoose';
import { DATABASE_URL } from './config';

mongoose.Promise = global.Promise;

const connectToDatabase = async (): Promise<void> => {
  const options: ConnectOptions = {
    autoIndex: true,
  };

  await mongoose.connect(DATABASE_URL, options);
};

export { connectToDatabase };
