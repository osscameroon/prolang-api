import { FilterQuery, isValidObjectId } from 'mongoose';

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
  const filter = isValidObjectId(idOrName) ? { _id: idOrName } : { name: new RegExp(`${idOrName}`, 'gi') };

  return LanguageModel.findOne(filter).populate(populate).exec();
};

const findById = async (id: string) => {
  return LanguageModel.findById(id);
};

const findByIds = async (ids: string[]) => {
  return LanguageModel.find({ _id: { $in: ids } });
};

const findAll = async (fields?: string, populate?: string): Promise<any[]> => {
  return LanguageModel.find().sort({ name: 1 }).populate(populate).select(fields).exec();
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
  return LanguageModel.countDocuments();
};

const update = async (id: string, input: Partial<UpdateLanguageInput>) => {
  await LanguageModel.updateOne({ _id: id }, { ...input });
};

const findOneOrFail = async (filter: FilterQuery<LanguageDocument>, populateFields?: string) => {
  const language = await LanguageModel.findOne(filter, undefined, { populate: populateFields });

  if (!language) {
    throw new Error(RESOURCE_NOT_FOUND);
  }

  return language;
};

const deleteById = async (id: string) => {
  return LanguageModel.deleteOne({ _id: id });
};

const findByAuthor = async (authorId: string) => {
  return LanguageModel.find({ authors: { $in: [authorId] } });
};

const findSuccessors = async (languageId: string) => {
  return LanguageModel.find({ predecessors: { $in: [languageId] } });
};

const countByYearGroup = async (yearGroupId: string) => {
  return LanguageModel.find({ yearGroup: yearGroupId }).countDocuments();
};

export default {
  count,
  countByYearGroup,
  deleteById,
  findAll,
  findByAuthor,
  findById,
  findByIdOrName,
  findByIds,
  findByYearGroup,
  findOneOrFail,
  findOrCreate,
  findPaginate,
  findSuccessors,
  update,
};
