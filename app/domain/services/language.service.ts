import { FilterQuery } from 'mongoose';

import { LanguageDocument, CreateLanguageInput, PaginatedResult } from '../../shared/types/models';
import { LanguageModel } from '../models/language.model';

const paginateLanguage = async (
  filter: FilterQuery<LanguageDocument>,
  page: number,
  limit: number,
  fields?: string,
  populate?: string,
): Promise<PaginatedResult<any>> => {
  const totalItems = await LanguageModel.find(filter).countDocuments();

  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(totalItems / limit);

  const items = await LanguageModel.find(filter, fields, {
    limit,
    populate,
    skip,
    sort: { name: 1 },
  });

  return {
    currentPage: page,
    items,
    limit,
    totalItems,
    totalPages,
  };
};

const findOrCreate = async (input: CreateLanguageInput) => {
  const language = await LanguageModel.findOne({ name: input.name, years: input.years });

  if (!language) {
    return LanguageModel.create(input);
  }

  return language;
};

const findByIdOrName = async (idOrName: string, populate?: string): Promise<any> => {
  const queryBuilder = LanguageModel.findOne({ $or: [{ _id: idOrName }, { name: idOrName }] });

  if (populate) {
    populate.split(' ').forEach((model) => {
      queryBuilder.populate(model);
    });
  }

  return queryBuilder.exec();
};

const findAll = async (fields?: string, populate?: string): Promise<any[]> => {
  const queryBuilder = LanguageModel.find().sort({ name: 1 }).select(fields);

  if (populate) {
    populate.split(' ').forEach((model) => {
      queryBuilder.populate(model);
    });
  }

  return queryBuilder.exec();
};

const findPaginate = async (page: number, limit: number, search?: string, fields?: string, populate?: string) => {
  const filter: FilterQuery<LanguageDocument> = {
    name: { $regex: search ? new RegExp(`.*${search}.*`, 'gim') : /.*/ },
  };

  return paginateLanguage(filter, page, limit, fields, populate);
};

const findByYearGroup = async (
  yearGroupId: string,
  page: number,
  limit: number,
  search?: string,
  fields?: string,
  populate?: string,
) => {
  const filter: FilterQuery<LanguageDocument> = {
    name: { $regex: search ? new RegExp(`.*${search}.*`, 'gim') : /.*/ },
    // @ts-ignore
    yearGroup: yearGroupId,
  };

  return paginateLanguage(filter, page, limit, fields, populate);
};

export default {
  findAll,
  findByIdOrName,
  findByYearGroup,
  findOrCreate,
  findPaginate,
};
