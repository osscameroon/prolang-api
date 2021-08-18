import { CreateYearGroupInput } from '../../shared/types/models';
import { YearGroupModel } from '../models/yearGroup.model';
import { DOCUMENT_EXIST_MESSAGE } from '../../shared/utils/constants';

const create = async (input: CreateYearGroupInput, throwIfExist?: boolean) => {
  const isPresent = await YearGroupModel.exists({ name: input.name });

  if (!isPresent) {
    return YearGroupModel.create(input);
  }

  if (throwIfExist) {
    throw new Error(DOCUMENT_EXIST_MESSAGE);
  }

  return;
};

const findById = async (id: string) => {
  return YearGroupModel.findById(id);
};

const findAll = async () => {
  return YearGroupModel.find().sort({ name: 1 }).exec();
};

export default {
  create,
  findById,
  findAll,
};
