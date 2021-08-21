import { FilterQuery } from 'mongoose';

import { AuthorDocument, CreateAuthorInput, PaginatedResult } from '../../shared/types/models';
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
  return AuthorModel.find().sort({ name: 1 }).select(fields).exec();
};

const findPaginate = async (
  page: number,
  limit: number,
  search?: string,
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

export default {
  findAll,
  findById,
  findOrCreate,
  findPaginate,
};
