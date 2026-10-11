import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { RowDataPacket } from "mysql2";
import { query } from "./db";

const COOKIE = "skirace_token";

type UserRow = RowDataPacket & {
  id: number;
  name: string;
  email: string;
  nickname: string;
  password_hash: string;
  is_admin: number | boolean;
};

export type PublicUser = {
  id: number;
  name: string;
  email: string;
  nickname: string;
  isAdmin: boolean;
  totalPoints: number;
};

export type AuthedRequest = Request & { user: PublicUser };

export function toPublicUser(row: UserRow, totalPoints = 0): PublicUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    nickname: row.nickname,
    isAdmin: Number(row.is_admin) === 1 && row.nickname.toLowerCase() === "ren",
    totalPoints,
  };
}

function secret(): string {
  const value = process.env.JWT_SECRET;
  if (!value) throw new Error("JWT_SECRET is not set");
  return value;
}

export function setAuthCookie(res: Response, userId: number): void {
  const token = jwt.sign({ uid: userId }, secret(), { expiresIn: "30d" });
  res.cookie(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

export function clearAuthCookie(res: Response): void {
  res.clearCookie(COOKIE, { path: "/" });
}

export async function requireUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.cookies?.[COOKIE] as string | undefined;
  if (!token) {
    res.status(401).json({ error: "Please log in" });
    return;
  }
  try {
    const payload = jwt.verify(token, secret()) as { uid: number };
    const rows = await query<UserRow>(
      "SELECT id, name, email, nickname, is_admin FROM users WHERE id = ?",
      [payload.uid],
    );
    const row = rows[0];
    if (!row) {
      res.status(401).json({ error: "Please log in" });
      return;
    }
    (req as AuthedRequest).user = toPublicUser(row);
    next();
  } catch {
    res.status(401).json({ error: "Please log in" });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const user = (req as AuthedRequest).user;
  if (!user?.isAdmin) {
    res.status(403).json({ error: "Only the administrator can do that" });
    return;
  }
  next();
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function checkPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
