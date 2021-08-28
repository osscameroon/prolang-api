import { FilterQuery } from 'mongoose';

import { LanguageDocument, CreateLanguageInput, PaginatedResult, UpdateLanguageInput } from '../../shared/types/models';
import { LanguageModel } from '../models/language.model';
import { RESOURCE_NOT_FOUND } from '../../shared/utils/constants';

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

const findById = async (id: string) => {
  return LanguageModel.findById(id);
};

const findByIds = async (ids: string[]) => {
  return LanguageModel.find({ _id: { $in: ids } });
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

const findPaginate = async (
  page: number,
  limit: number,
  search?: string,
  fields?: string,
  populate?: string,
  yearGroupId?: string,
) => {
  const filter: FilterQuery<LanguageDocument> = {
    name: { $regex: search ? new RegExp(`.*${search}.*`, 'gim') : /.*/ },
    // @ts-ignore
    yearGroup: !yearGroupId ? { $ne: null } : yearGroupId,
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
    yearGroup: yearGroupId,
  };

  return paginateLanguage(filter, page, limit, fields, populate);
};

const count = async () => {
  return LanguageModel.count();
};

const update = async (id: string, input: UpdateLanguageInput) => {
  await LanguageModel.updateOne({ id }, { ...input });
};

const findOneOrFail = async (filter: FilterQuery<LanguageDocument>, populateFields?: string) => {
  const language = await LanguageModel.findOne(filter, undefined, { populate: populateFields });

  if (!language) {
    throw new Error(RESOURCE_NOT_FOUND);
  }

  return language;
};

const deleteById = async (id: string) => {
  return LanguageModel.deleteOne({ id });
};

export default {
  count,
  deleteById,
  findAll,
  findById,
  findByIdOrName,
  findByIds,
  findByYearGroup,
  findOneOrFail,
  findOrCreate,
  findPaginate,
  update,
};
