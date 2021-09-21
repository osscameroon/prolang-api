import path from 'path';
import { Router, Request, Response } from 'express';

const wait = (time: number) => new Promise((resolve) => setTimeout(() => resolve(true), time));

const commonRoute = () => {
  const router = Router();

  router.get('/api', async (_req: Request, res: Response) => {
    await wait(5000);
    res.sendFile(path.join(__dirname, '../docs/index.html'));
  });

  return router;
};

export { commonRoute };
