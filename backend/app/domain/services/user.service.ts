import { CreateUserInput } from '../../shared/types/models';
import { UserModel } from '../models/user.model';
import { USER_ALREADY_EXISTS } from '../../shared/utils/constants';

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

export default {
  count,
  create,
  findAll,
  findByEmail,
  findById,
};
