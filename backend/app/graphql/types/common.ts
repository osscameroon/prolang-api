import { Response } from "express";

export type AppContext = {
  ip: string | null;
  reqStartTime: [number, number];
  xRes: Response;
};
