import mongoose, { ConnectionOptions } from 'mongoose';
import { DATABASE_URL } from './config';

mongoose.Promise = global.Promise;

const connectToDatabase = async (): Promise<void> => {
  const options: ConnectionOptions = { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true };

  await mongoose.connect(DATABASE_URL, options);
};

export { connectToDatabase };
