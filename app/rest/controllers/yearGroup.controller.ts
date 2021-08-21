import { Request, Response } from 'express';
import yearGroupService from '../../domain/services/yearGroup.service';
import { RECORD_NOT_FOUND_MESSAGE } from '../../shared/utils/constants';

const getAll = async (_req: Request, res: Response) => {
  const result = await yearGroupService.findAll();

  return res.json({ data: result });
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await yearGroupService.findById(id);

  if (!item) {
    return res.status(404).json({ message: RECORD_NOT_FOUND_MESSAGE('LofEvent', id) });
  }

  return res.json({ data: item });
};

export { getAll, getOne };
