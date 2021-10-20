import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

import { connectToDatabase } from '../core/database';
import { DATABASE_URL } from '../core/config';

(async () => {
  await connectToDatabase(DATABASE_URL);

  const collections = await mongoose.connection.db.listCollections().toArray();
  const outputDir = path.resolve(__dirname, '../../../public/dumps');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (const collection of collections) {
    const outputFile = path.join(outputDir, `${collection.name}.json`);

    execSync(`mongoexport --uri ${DATABASE_URL} -c ${collection.name} --out ${outputFile}`);
  }

  await mongoose.connection.close();
})();
