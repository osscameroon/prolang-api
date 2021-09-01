import { Request, Response } from 'express';
import yearGroupService from '../../domain/services/yearGroup.service';
import languageService from '../../domain/services/language.service';
import { RECORD_NOT_FOUND_MESSAGE } from '../../shared/utils/constants';
import { transformYearGroupResponse } from '../../domain/responses/yearGroup.response';
import { YearGroupResponse } from '../../shared/types/responses';

const getAll = async (req: Request, res: Response) => {
  const { countLanguage } = req.query;
  const result = await yearGroupService.findAll();

  const transformResult = transformYearGroupResponse(result) as YearGroupResponse[];

  if (countLanguage) {
    const promises = transformResult.map(async (yearGroupResponse) => {
      return {
        ...yearGroupResponse,
        languageCount: await languageService.countByYearGroup(yearGroupResponse.id),
      };
    });

    const result = await Promise.all(promises);

    return res.json({ data: result.sort((a, b) => a.position - b.position) });
  }

  return res.json({ data: transformResult });
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await yearGroupService.findById(id);

  if (!item) {
    return res.status(404).json({ message: RECORD_NOT_FOUND_MESSAGE('YearGroup', id) });
  }

  return res.json({ data: transformYearGroupResponse(item) });
};

export { getAll, getOne };
