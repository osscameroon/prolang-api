import { FilterQuery } from 'mongoose';

import { CreateUserInput, UpdateUserInput, UserDocument } from '../../shared/types/models';
import { UserModel } from '../models/user.model';
import { RESOURCE_NOT_FOUND, USER_ALREADY_EXISTS } from '../../shared/utils/constants';

const create = async (input: CreateUserInput) => {
  const user = await UserModel.findOne({ email: input.email });

  if (user) {
    throw new Error(USER_ALREADY_EXISTS);
  }

  return UserModel.create(input);
};

const findById = async (id: string) => {
  return UserModel.findById(id);
};

const findByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};

const findAll = async () => {
  return UserModel.find().sort({ name: 1 }).exec();
};

const count = async () => {
  return UserModel.count();
};

const update = async (id: string, input: UpdateUserInput) => {
  await UserModel.updateOne({ id }, { ...input });
};

const findOneOrFail = async (filter: FilterQuery<UserDocument>) => {
  const user = await UserModel.findOne(filter);

  if (!user) {
    throw new Error(RESOURCE_NOT_FOUND);
  }

  return user;
};

const deleteById = async (id: string) => {
  return UserModel.deleteOne({ id });
};

export default {
  count,
  create,
  deleteById,
  findAll,
  findByEmail,
  findById,
  findOneOrFail,
  update,
};
