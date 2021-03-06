import { CreateYearGroupInput } from '../../shared/types/models';
import { YearGroupModel } from '../models/yearGroup.model';
import { YEAR_GROUP_NOT_LISTED } from '../../shared/utils/constants';

const findOrCreate = async (input: CreateYearGroupInput) => {
  const yearGroup = await YearGroupModel.findOne({ name: input.name });

  if (!yearGroup) {
    return YearGroupModel.create(input);
  }

  return yearGroup;
};

const findById = async (id: string) => {
  return YearGroupModel.findById(id);
};

const findByName = async (name: string) => {
  return YearGroupModel.findOne({ name });
};

const findAll = async () => {
  return YearGroupModel.find().sort({ position: 1 }).exec();
};

const createNotListedGroup = async () => {
  const yearGroup = await YearGroupModel.findOne({ name: YEAR_GROUP_NOT_LISTED });

  if (!yearGroup) {
    await YearGroupModel.create({ name: YEAR_GROUP_NOT_LISTED, position: 100 });
  }
};

const findNotListedGroup = async () => {
  return YearGroupModel.findOne({ name: YEAR_GROUP_NOT_LISTED });
};

const count = async () => {
  return YearGroupModel.countDocuments();
};

export default {
  count,
  createNotListedGroup,
  findAll,
  findById,
  findByName,
  findNotListedGroup,
  findOrCreate,
};
