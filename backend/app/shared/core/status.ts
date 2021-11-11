import { Request, Response } from 'express';

const writeEvent = (res: Response, sseId: string, data: string) => {
  res.write(`id: ${sseId}\n`);
  res.write(`data: new server event ${data}\n\n`);
};

const sendEvent = (_req: Request, res: Response) => {
  res.writeHead(200, {
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
  });

  const sseId = new Date().toLocaleTimeString();

  setInterval(() => {
    writeEvent(res, sseId, new Date().toLocaleTimeString());
  }, 5000);

  writeEvent(res, sseId, new Date().toLocaleTimeString());
};

export { sendEvent };
