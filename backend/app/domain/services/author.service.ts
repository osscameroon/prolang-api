import { FilterQuery } from 'mongoose';

import { AuthorDocument, CreateAuthorInput, PaginatedResult, UpdateAuthorInput } from '../../shared/types/models';
import { AuthorModel } from '../models/author.model';
import { RESOURCE_NOT_FOUND } from '../../shared/utils/constants';

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

const findByIds = async (ids: string[]) => {
  return AuthorModel.find({ _id: { $in: ids } });
};

const findAll = async (fields?: string) => {
  return AuthorModel.find().sort({ name: 1 }).select(fields).exec();
};

const findPaginate = async (
  page: number,
  limit: number,
  search?: string | null,
  fields?: string,
): Promise<PaginatedResult<AuthorDocument>> => {
  const filter: FilterQuery<AuthorDocument> = {
    name: { $regex: search ? new RegExp(`.*${search}.*`, 'gim') : /.*/ },
  };

  const totalItems = await AuthorModel.find(filter).countDocuments();

  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(totalItems / limit);

  const items: AuthorDocument[] = await AuthorModel.find(filter, fields, { limit, skip, sort: { name: 1 } });

  return {
    currentPage: page,
    items,
    limit,
    totalItems,
    totalPages,
  };
};

const count = async () => {
  return AuthorModel.count();
};

const update = async (id: string, input: UpdateAuthorInput) => {
  await AuthorModel.updateOne({ id }, { ...input });
};

const findOneOrFail = async (filter: FilterQuery<AuthorDocument>) => {
  const user = await AuthorModel.findOne(filter);

  if (!user) {
    throw new Error(RESOURCE_NOT_FOUND);
  }

  return user;
};

export default {
  count,
  findAll,
  findById,
  findByIds,
  findOneOrFail,
  findOrCreate,
  findPaginate,
  update,
};
