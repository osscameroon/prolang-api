import path from 'path';
import { Router, Request, Response } from 'express';
import { sendEvent } from '../../shared/core/status';

const commonRoute = () => {
  const router = Router();

  router.get('/', async (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../docs/index.html'));
  });

  router.get('/health', (req: Request, res: Response) => {
    if (req.headers.accept && req.headers.accept == 'text/event-stream') {
      sendEvent(req, res);
    } else {
      res.json({ message: 'Ok' });
    }
  });

  return router;
};

export { commonRoute };
