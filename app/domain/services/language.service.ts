import { FilterQuery } from 'mongoose';

import { LanguageDocument, CreateLanguageInput, PaginatedResult } from '../../shared/types/models';
import { LanguageModel } from '../models/language.model';

const paginateLanguage = async (
  filter: FilterQuery<LanguageDocument>,
  page: number,
  limit: number,
  fields?: string,
): Promise<PaginatedResult<LanguageDocument>> => {
  const totalItems = await LanguageModel.find(filter).countDocuments();

  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(totalItems / limit);

  const items: LanguageDocument[] = await LanguageModel.find(filter, fields, {
    limit,
    populate: 'yearGroup authors predecessors',
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

const findByIdOrName = async (idOrName: string) => {
  return LanguageModel.findOne({ $or: [{ _id: idOrName }, { name: idOrName }] });
};

const findAll = async (fields?: string) => {
  return LanguageModel.find()
    .sort({ name: 1 })
    .select(fields)
    .populate('yearGroup')
    .populate('authors')
    .populate('predecessors')
    .exec();
};

const findPaginate = async (page: number, limit: number, search?: string, fields?: string) => {
  const filter: FilterQuery<LanguageDocument> = {
    name: { $regex: search ? new RegExp(`.*${search}.*`, 'gim') : /.*/ },
  };

  return paginateLanguage(filter, page, limit, fields);
};

const findByYearGroup = async (yearGroupId: string, page: number, limit: number, search?: string, fields?: string) => {
  const filter: FilterQuery<LanguageDocument> = {
    name: { $regex: search ? new RegExp(`.*${search}.*`, 'gim') : /.*/ },
    // @ts-ignore
    yearGroup: yearGroupId,
  };

  return paginateLanguage(filter, page, limit, fields);
};

export default {
  findAll,
  findByIdOrName,
  findByYearGroup,
  findOrCreate,
  findPaginate,
};
