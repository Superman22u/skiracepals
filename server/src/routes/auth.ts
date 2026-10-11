import { Router } from "express";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { z } from "zod";
import {
  type AuthedRequest,
  checkPassword,
  clearAuthCookie,
  hashPassword,
  requireAdmin,
  requireUser,
  setAuthCookie,
  toPublicUser,
} from "../auth";
import { pool, query, withTx } from "../db";
import { asyncRoute, isDuplicate, readBody } from "../http";
import { pointsFor } from "../scores";

const router = Router();

const registerSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Use at least 8 characters").max(200),
  nickname: z
    .string()
    .trim()
    .min(2, "Nickname needs at least 2 characters")
    .max(24, "Nickname can be at most 24 characters")
    .regex(/^[A-Za-z0-9_-]+$/, "Nickname can use letters, numbers, _ and -"),
});

const loginSchema = z.object({
  login: z.string().trim().min(1, "Enter your email or nickname"),
  password: z.string().min(1, "Enter your password"),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Enter your current password"),
  newPassword: z.string().min(8, "Use at least 8 characters").max(200),
});

const forgotSchema = z.object({
  nickname: z.string().trim().min(1, "Enter your nickname").max(24),
});

const adminPasswordSchema = z.object({
  newPassword: z.string().min(8, "Use at least 8 characters").max(200),
});

type UserRow = RowDataPacket & {
  id: number;
  name: string;
  email: string;
  nickname: string;
  password_hash: string;
  is_admin: number;
};

async function present(row: UserRow) {
  const user = toPublicUser(row);
  user.totalPoints = await pointsFor(user.id);
  return user;
}

router.post(
  "/register",
  asyncRoute(async (req, res) => {
    const body = readBody(registerSchema, req.body, res);
    if (!body) return;
    if (body.nickname.toLowerCase() === "ren") {
      res.status(400).json({ error: "That nickname is reserved" });
      return;
    }
    try {
      const hash = await hashPassword(body.password);
      const [result] = await pool.query(
        "INSERT INTO users (name, email, password_hash, nickname, is_admin) VALUES (?, ?, ?, ?, 0)",
        [body.name, body.email, hash, body.nickname],
      );
      const id = Number((result as { insertId: number }).insertId);
      setAuthCookie(res, id);
      const rows = await query<UserRow>(
        "SELECT id, name, email, nickname, is_admin FROM users WHERE id = ?",
        [id],
      );
      res.status(201).json(await present(rows[0]));
    } catch (error) {
      if (isDuplicate(error)) {
        const message = error instanceof Error ? error.message : "";
        res.status(409).json({
          error: message.includes("uniq_users_email") ? "That email is already used" : "That nickname is already used",
        });
        return;
      }
      throw error;
    }
  }),
);

router.post(
  "/login",
  asyncRoute(async (req, res) => {
    const body = readBody(loginSchema, req.body, res);
    if (!body) return;
    const byEmail = body.login.includes("@");
    const rows = await query<UserRow>(
      byEmail
        ? "SELECT id, name, email, nickname, password_hash, is_admin FROM users WHERE LOWER(email) = LOWER(?)"
        : "SELECT id, name, email, nickname, password_hash, is_admin FROM users WHERE nickname = ?",
      [body.login],
    );
    const row = rows[0];
    if (!row || !(await checkPassword(body.password, row.password_hash))) {
      res.status(401).json({ error: "Email, nickname or password is wrong" });
      return;
    }
    setAuthCookie(res, row.id);
    res.json(await present(row));
  }),
);

router.post("/logout", (_req, res) => {
  clearAuthCookie(res);
  res.status(204).end();
});

router.get(
  "/me",
  requireUser,
  asyncRoute(async (req, res) => {
    const user = (req as AuthedRequest).user;
    user.totalPoints = await pointsFor(user.id);
    res.json(user);
  }),
);

router.post(
  "/password",
  requireUser,
  asyncRoute(async (req, res) => {
    const body = readBody(passwordSchema, req.body, res);
    if (!body) return;
    const user = (req as AuthedRequest).user;
    const rows = await query<UserRow>("SELECT password_hash FROM users WHERE id = ?", [user.id]);
    const row = rows[0];
    if (!row || !(await checkPassword(body.currentPassword, row.password_hash))) {
      res.status(400).json({ error: "Current password is wrong" });
      return;
    }
    await pool.query("UPDATE users SET password_hash = ?, password_reset_at = NULL WHERE id = ?", [
      await hashPassword(body.newPassword),
      user.id,
    ]);
    res.status(204).end();
  }),
);

router.post(
  "/forgot",
  asyncRoute(async (req, res) => {
    const body = readBody(forgotSchema, req.body, res);
    if (!body) return;
    await pool.query("UPDATE users SET password_reset_at = CURRENT_TIMESTAMP WHERE LOWER(nickname) = LOWER(?)", [
      body.nickname,
    ]);
    res.json({
      message: "If that nickname is registered, the administrator can set a new password. Ask them for it.",
    });
  }),
);

router.get(
  "/pals",
  requireUser,
  requireAdmin,
  asyncRoute(async (req, res) => {
    const user = (req as AuthedRequest).user;
    const rows = await query<
      RowDataPacket & { id: number; name: string; email: string; nickname: string; password_reset_at: string | null }
    >(
      `SELECT id, name, email, nickname, password_reset_at
       FROM users
       WHERE id <> ?
       ORDER BY password_reset_at IS NULL, nickname`,
      [user.id],
    );
    res.json({
      pals: rows.map((row) => ({
        id: Number(row.id),
        name: row.name,
        email: row.email,
        nickname: row.nickname,
        resetRequested: row.password_reset_at != null,
      })),
    });
  }),
);

router.post(
  "/pals/:id/password",
  requireUser,
  requireAdmin,
  asyncRoute(async (req, res) => {
    const body = readBody(adminPasswordSchema, req.body, res);
    if (!body) return;
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Unknown account" });
      return;
    }
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE users SET password_hash = ?, password_reset_at = NULL WHERE id = ? AND id <> ?",
      [await hashPassword(body.newPassword), id, (req as AuthedRequest).user.id],
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Unknown account" });
      return;
    }
    res.status(204).end();
  }),
);

async function deleteUserData(userId: number): Promise<boolean> {
  return withTx(async (conn) => {
    await conn.query("DELETE FROM bets WHERE user_id = ?", [userId]);
    const [result] = await conn.query<ResultSetHeader>("DELETE FROM users WHERE id = ?", [userId]);
    return result.affectedRows > 0;
  });
}

router.delete(
  "/me",
  requireUser,
  asyncRoute(async (req, res) => {
    const user = (req as AuthedRequest).user;
    await deleteUserData(user.id);
    clearAuthCookie(res);
    res.status(204).end();
  }),
);

router.delete(
  "/pals/:id",
  requireUser,
  requireAdmin,
  asyncRoute(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0 || id === (req as AuthedRequest).user.id) {
      res.status(400).json({ error: "Unknown account" });
      return;
    }
    if (!(await deleteUserData(id))) {
      res.status(404).json({ error: "Unknown account" });
      return;
    }
    res.status(204).end();
  }),
);

export const authRouter = router;
