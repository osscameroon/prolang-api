import { CreateUserInput } from '../../shared/types/models';
import { UserModel } from '../models/user.model';
import { USER_ALREADY_EXISTS } from '../../shared/utils/constants';

const create = async (input: CreateUserInput) => {
  const author = await UserModel.findOne({ email: input.email });

  if (author) {
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

export default {
  create,
  findAll,
  findByEmail,
  findById,
};
