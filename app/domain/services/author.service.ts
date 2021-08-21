import { FilterQuery } from 'mongoose';

import { AuthorDocument, CreateAuthorInput } from '../../shared/types/models';
import { AuthorModel } from '../models/author.model';

const findOrCreate = async (input: CreateAuthorInput) => {
  const author = await AuthorModel.findOne({ name: input.name });

  if (!author) {
    return AuthorModel.create(input);
  }

  return author;
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
  return AuthorModel.paginate(filter, { limit, page, select: fields || '*' }).sort({ name: 1 });
};

export default {
  findAll,
  findById,
  findOrCreate,
  findPaginate,
};
