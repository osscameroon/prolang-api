import { Router, Request, Response } from 'express';

const commonRoute = () => {
  const router = Router();

  router.get('/', (_req: Request, res: Response) => {
    throw new Error('dldjldl');
    res.json({ message: 'Hello from programming languages API' });
  });

  return router;
};

export { commonRoute };
