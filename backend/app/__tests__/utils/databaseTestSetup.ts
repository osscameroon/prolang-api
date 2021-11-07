// This file is executed once in the worker before executing each test file.
import mongoose from 'mongoose';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import yearGroupService from '../../domain/services/yearGroup.service';

import { connectToDatabase } from '../../shared/core/database';
import { yearGroupsInput } from './fixtures';

jest.setTimeout(60000);

// @ts-ignore
let runningContainer: StartedTestContainer;
const databaseUser = 'user';
const databasePassword = 'password';
const databasePort = 27017;

beforeAll(async () => {
  const container = new GenericContainer('mongo:4.4');

  runningContainer = await container
    .withExposedPorts(databasePort)
    .withEnv('MONGO_INITDB_ROOT_USERNAME', databaseUser)
    .withEnv('MONGO_INITDB_ROOT_PASSWORD', databasePassword)
    .start();

  const runningPort = runningContainer.getMappedPort(databasePort);

  const databaseURL = `mongodb://${databaseUser}:${databasePassword}@localhost:${runningPort}/admin`;

  await connectToDatabase(databaseURL);

  await Promise.all(yearGroupsInput.map((input) => yearGroupService.findOrCreate(input)));
});

afterAll(async () => {
  await mongoose.connection.close();

  if (runningContainer) {
    await runningContainer.stop();
  }
});
