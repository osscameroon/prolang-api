import { FilterQuery } from 'mongoose';

import { AuthorDocument, CreateAuthorInput } from '../../shared/types/models';
import { AuthorModel } from '../models/author.model';
import { DOCUMENT_EXIST_MESSAGE } from '../../shared/utils/constants';

const create = async (input: CreateAuthorInput, throwIfExist?: boolean) => {
  const isPresent = await AuthorModel.exists({ name: input.name });

  if (!isPresent) {
    return AuthorModel.create(input);
  }

  if (throwIfExist) {
    throw new Error(DOCUMENT_EXIST_MESSAGE);
  }

  return;
};

const findById = async (id: string) => {
  return AuthorModel.findById(id);
};

const findAll = async (fields?: string) => {
  return AuthorModel.find()
    .sort({ name: 1 })
    .select(fields || '*')
    .exec();
};

const findPaginate = async (page: number, limit: number, search?: string, fields?: string) => {
  const filter: FilterQuery<AuthorDocument> = { name: search ? new RegExp(`.*${search}.*`, 'gim') : undefined };

  // @ts-ignore
  return AuthorModel.paginate(filter, { page, limit, select: fields || '*' }).sort({ name: 1 });
};

export default {
  create,
  findById,
  findAll,
  findPaginate,
};
