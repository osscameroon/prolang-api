import { Request, Response } from 'express';

import languageService from '../../domain/services/language.service';
import yearGroupService from '../../domain/services/yearGroup.service';
import { RECORD_NOT_FOUND_MESSAGE } from '../../shared/utils/constants';
import { transformLanguageResponse } from '../../domain/responses/language.response';
import { extractQueryFields } from '../../shared/utils/helpers';
import { PAGINATION_LIMIT } from '../../shared/core/config';
import { LanguagePopulatedDocument, PaginatedResult } from '../../shared/types/models';

const populateFields = 'authors predecessors yearGroup';

const getAll = async (req: Request, res: Response) => {
  const { fields } = extractQueryFields(req.query);

  const result: LanguagePopulatedDocument[] = await languageService.findAll(fields, populateFields);

  return res.json({ data: transformLanguageResponse(result) });
};

const search = async (req: Request, res: Response) => {
  const { fields, keyword, page } = extractQueryFields(req.query);

  const result: PaginatedResult<LanguagePopulatedDocument> = await languageService.findPaginate(
    page,
    PAGINATION_LIMIT,
    keyword,
    fields,
    populateFields,
  );

  return res.json({ data: { ...result, items: transformLanguageResponse(result.items) } });
};

const getByIdOrName = async (req: Request, res: Response) => {
  const { idOrName } = req.params;
  const item: LanguagePopulatedDocument = await languageService.findByIdOrName(idOrName);

  if (!item) {
    return res.status(404).json({ message: RECORD_NOT_FOUND_MESSAGE('Language', idOrName) });
  }

  return res.json({ data: transformLanguageResponse(item) });
};

const getByYearGroup = async (req: Request, res: Response) => {
  const { name } = req.params;
  const { fields, keyword, page } = extractQueryFields(req.query);

  const yearGroup = await yearGroupService.findByName(name);

  if (!yearGroup) {
    return res.status(404).json({ message: RECORD_NOT_FOUND_MESSAGE('YearGroup', name) });
  }

  const result = await languageService.findByYearGroup(
    yearGroup._id,
    page,
    PAGINATION_LIMIT,
    keyword,
    fields,
    populateFields,
  );

  return res.json({ data: { ...result, items: transformLanguageResponse(result.items) } });
};

export { getAll, getByIdOrName, getByYearGroup, search };
