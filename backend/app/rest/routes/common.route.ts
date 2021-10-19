import path from 'path';
import { Router, Request, Response } from 'express';

const commonRoute = () => {
  const router = Router();

  router.get('/api', async (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../docs/index.html'));
  });

  router.get('/api/health', (_req: Request, res: Response) => {
    res.json({ message: 'Ok' });
  });

  return router;
};

export { commonRoute };
