// This file is executed once in the worker before executing each test file.
import mongoose from 'mongoose';
import { connectToDatabase } from '../../shared/core/database';

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});
