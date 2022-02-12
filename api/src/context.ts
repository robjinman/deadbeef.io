import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AppConfig } from "./config";

export interface Context {
  config: AppConfig
  prisma: PrismaClient;
  req: Request;
  res: Response;
}
