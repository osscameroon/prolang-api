import mongoose, { ConnectOptions } from 'mongoose';

mongoose.Promise = global.Promise;

const connectToDatabase = async (databaseUrl: string): Promise<void> => {
  const options: ConnectOptions = {
    autoIndex: true,
  };

  await mongoose.connect(databaseUrl, options);
};

export { connectToDatabase };
