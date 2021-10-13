// This file is executed once in the worker before executing each test file.
import mongoose from 'mongoose';
import { GenericContainer, StartedTestContainer } from 'testcontainers';

import { connectToDatabase } from '../../shared/core/database';

// @ts-ignore
let runningContainer: StartedTestContainer;

beforeAll(async () => {
  const container = new GenericContainer('mongo:4.4');

  runningContainer = await container
    .withExposedPorts(27018)
    .withEnv('MONGO_INITDB_ROOT_USERNAME', 'user')
    .withEnv('MONGO_INITDB_ROOT_PASSWORD', 'password')
    //.withEnv('MONGO_INITDB_DATABASE', 'prolang')
    .start();

  console.log(runningContainer.getHost());

  await connectToDatabase();
}, 120000);

afterAll(async () => {
  console.log('connection closed');
  await mongoose.connection.close();

  if (runningContainer) {
    await runningContainer.stop();
  }
});
