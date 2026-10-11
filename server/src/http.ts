import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export function asyncRoute(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

export function readBody<T>(schema: ZodType<T>, body: unknown, res: Response): T | undefined {
  const result = schema.safeParse(body);
  if (!result.success) {
    res.status(400).json({ error: result.error.issues[0]?.message ?? "Check the form" });
    return;
  }
  return result.data;
}

export function isDuplicate(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ER_DUP_ENTRY";
}
