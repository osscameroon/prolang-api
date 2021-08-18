import { FilterQuery } from 'mongoose';

import { LanguageDocument, CreateLanguageInput } from '../../shared/types/models';
import { LanguageModel } from '../models/language.model';
import { DOCUMENT_EXIST_MESSAGE } from '../../shared/utils/constants';

const create = async (input: CreateLanguageInput, throwIfExist?: boolean) => {
  const isPresent = await LanguageModel.exists({ name: input.name });

  if (!isPresent) {
    return LanguageModel.create(input);
  }

  if (throwIfExist) {
    throw new Error(DOCUMENT_EXIST_MESSAGE);
  }

  return;
};

const findById = async (id: string) => {
  return LanguageModel.findById(id);
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
  create,
  findById,
  findAll,
  findPaginate,
  findByYearGroup,
};
