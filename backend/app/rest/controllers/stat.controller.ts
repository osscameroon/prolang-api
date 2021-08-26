import { Request, Response } from 'express';

import authorService from '../../domain/services/author.service';
import languageService from '../../domain/services/language.service';
import yearGroupService from '../../domain/services/yearGroup.service';
import userService from '../../domain/services/user.service';

export const summary = async (_req: Request, res: Response) => {
  const authorCount = await authorService.count();
  const languageCount = await languageService.count();
  const yearGroupCount = await yearGroupService.count();
  const userCount = await userService.count();

  return res.json({
    data: {
      author: authorCount,
      language: languageCount,
      user: userCount,
      yearGroup: yearGroupCount,
    },
  });
};
