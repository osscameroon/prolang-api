import { ENV } from './shared/core/config';
import { connectToDatabase } from './shared/core/database';

console.log('Environment', ENV);

(async () => {
  await connectToDatabase();

  console.log('Connected successfully to the database!');
})();

process.on('unhandledRejection', (e: any) => {
  console.error(e);

  if (e.name === 'MongoError') {
    process.exit(1);
  }
});
