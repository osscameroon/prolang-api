import path from 'path';
import { Router, Request, Response } from 'express';

const commonRoute = () => {
  const router = Router();

  router.get('/api', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../docs/index.html'));
  });

  return router;
};

export { commonRoute };
