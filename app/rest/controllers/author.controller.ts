import { Request, Response } from 'express';

import authorService from '../../domain/services/author.service';
import { RECORD_NOT_FOUND_MESSAGE } from '../../shared/utils/constants';
import { transformAuthorResponse } from '../../domain/responses/author.response';
import { extractQueryFields } from '../../shared/utils/helpers';
import { PAGINATION_LIMIT } from '../../shared/core/config';

const getAll = async (req: Request, res: Response) => {
  const { fields } = extractQueryFields(req.query);

  const result = await authorService.findAll(fields);

  return res.json({ data: transformAuthorResponse(result) });
};

const search = async (req: Request, res: Response) => {
  const { fields, keyword, page } = extractQueryFields(req.query);

  const result = await authorService.findPaginate(page, PAGINATION_LIMIT, keyword, fields);

  return res.json({ data: { ...result, items: transformAuthorResponse(result.items) } });
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await authorService.findById(id);

  if (!item) {
    return res.status(404).json({ message: RECORD_NOT_FOUND_MESSAGE('Author', id) });
  }

  return res.json({ data: transformAuthorResponse(item) });
};

export { getAll, getOne, search };
