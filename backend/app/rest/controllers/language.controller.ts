import { Request, Response } from 'express';

import languageService from '../../domain/services/language.service';
import yearGroupService from '../../domain/services/yearGroup.service';
import { RECORD_DELETED_MESSAGE, RECORD_NOT_FOUND_MESSAGE } from '../../shared/utils/constants';
import { transformLanguageResponse } from '../../domain/responses/language.response';
import { extractQueryFields } from '../../shared/utils/helpers';
import { PAGINATION_LIMIT } from '../../shared/core/config';
import { CreateLanguageInput, LanguagePopulatedDocument, PaginatedResult } from '../../shared/types/models';

const populateFields = 'authors predecessors yearGroup';

const create = async (req: Request, res: Response) => {
  const { body } = req;

  const input: CreateLanguageInput = {
    authors: body.authors,
    company: body.company,
    link: body.link,
    listed: false,
    longName: body.longName,
    name: body.name,
    nameExtra: body.nameExtra,
    predecessors: body.predecessors,
    yearConfirmed: body.yearConfirmed,
    yearGroup: body.yearGroup,
    years: body.years,
  };

  const languageCreated = await languageService.findOrCreate(input);

  const language = await languageService.findOneOrFail({ _id: languageCreated._id }, populateFields);

  return res.json({ data: transformLanguageResponse(language as LanguagePopulatedDocument) });
};

const getAll = async (req: Request, res: Response) => {
  const { fields } = extractQueryFields(req.query);

  const result: LanguagePopulatedDocument[] = await languageService.findAll(fields, populateFields);

  return res.json({ data: transformLanguageResponse(result) });
};

const search = async (req: Request, res: Response) => {
  const { fields, keyword, name, page } = extractQueryFields(req.query);

  let yearGroup = null;

  if (name) {
    yearGroup = await yearGroupService.findByName(name);
  }

  const result: PaginatedResult<LanguagePopulatedDocument> = await languageService.findPaginate(
    page,
    PAGINATION_LIMIT,
    keyword,
    fields,
    populateFields,
    yearGroup?._id,
  );

  return res.json({ data: { ...result, items: transformLanguageResponse(result.items) } });
};

const getByIdOrName = async (req: Request, res: Response) => {
  const { idOrName } = req.params;
  const item: LanguagePopulatedDocument = await languageService.findByIdOrName(idOrName, populateFields);

  if (!item) {
    return res.status(404).json({ message: RECORD_NOT_FOUND_MESSAGE('Language', idOrName) });
  }

  return res.json({ data: transformLanguageResponse(item) });
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await languageService.findById(id);

  if (!item) {
    return res.status(404).json({ message: RECORD_NOT_FOUND_MESSAGE('Language', id) });
  }

  await languageService.update(id, req.body);

  const language = await languageService.findOneOrFail({ _id: id }, populateFields);

  return res.json({ data: transformLanguageResponse(language as LanguagePopulatedDocument) });
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await languageService.findById(id);

  if (!item) {
    return res.status(410).json({ message: RECORD_NOT_FOUND_MESSAGE('Language', id) });
  }

  await languageService.deleteById(id);

  return res.json({ message: RECORD_DELETED_MESSAGE('Language') });
};

export { getAll, getByIdOrName, search, update, create, remove };
