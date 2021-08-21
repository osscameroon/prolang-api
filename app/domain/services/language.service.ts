import { FilterQuery } from 'mongoose';

import { LanguageDocument, CreateLanguageInput } from '../../shared/types/models';
import { LanguageModel } from '../models/language.model';

const findOrCreate = async (input: CreateLanguageInput) => {
  const language = await LanguageModel.findOne({ name: input.name, years: input.years });

  if (!language) {
    return LanguageModel.create(input);
  }

  // @ts-ignore
  return LanguageModel.findOneAndUpdate({ _id: language._id }, input);
};

const findById = async (id: string) => {
  return LanguageModel.findById(id);
};

const findByName = async (name: string) => {
  return LanguageModel.findOne({ name });
};

const findAll = async (fields?: string) => {
  return LanguageModel.find()
    .sort({ name: 1 })
    .select(fields || '*')
    .exec();
};

const findPaginate = async (page: number, limit: number, search?: string, fields?: string) => {
  const filter: FilterQuery<LanguageDocument> = { name: search ? new RegExp(`.*${search}.*`, 'gim') : undefined };

  // @ts-ignore
  return LanguageModel.paginate(filter, { page, limit, select: fields || '*' }).sort({ name: 1 });
};

const findByYearGroup = async (groupName: string, page: number, limit: number, search?: string, fields?: string) => {
  const filter: FilterQuery<LanguageDocument> = {
    'yearGroup.name': groupName,
    name: search ? new RegExp(`.*${search}.*`, 'gim') : undefined,
  };

  // @ts-ignore
  return LanguageModel.paginate(filter, { page, limit, select: fields || '*' }).sort({ name: 1 });
};

export default {
  findOrCreate,
  findById,
  findByName,
  findAll,
  findPaginate,
  findByYearGroup,
};
