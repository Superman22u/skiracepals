import "./env";
import mysql, { type PoolConnection, type RowDataPacket } from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST ?? "127.0.0.1",
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? "skirace",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "skiracepals",
  waitForConnections: true,
  connectionLimit: 10,
  charset: "utf8mb4",
  dateStrings: true,
});

export async function query<T extends RowDataPacket>(sql: string, params: unknown[] = []): Promise<T[]> {
  const [rows] = await pool.query<T[]>(sql, params);
  return rows;
}

export async function withTx<T>(fn: (conn: PoolConnection) => Promise<T>): Promise<T> {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const result = await fn(conn);
    await conn.commit();
    return result;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

const statements = [
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nickname VARCHAR(24) NOT NULL,
    is_admin TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_users_email (email),
    UNIQUE KEY uniq_users_nickname (nickname)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS skiers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    nation CHAR(3) NOT NULL,
    gender ENUM('W','M') NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    UNIQUE KEY uniq_skiers_name_gender (name, gender)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS races (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fis_race_id INT NULL,
    place VARCHAR(120) NOT NULL,
    discipline ENUM('DH','SG','GS','SL','AC') NOT NULL,
    gender ENUM('W','M') NOT NULL,
    race_date DATE NOT NULL,
    season SMALLINT NOT NULL,
    UNIQUE KEY uniq_races_fis (fis_race_id),
    UNIQUE KEY uniq_races_slot (place, discipline, gender, race_date)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS bets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    race_id INT NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_bets_user_race (user_id, race_id),
    CONSTRAINT fk_bets_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_bets_race FOREIGN KEY (race_id) REFERENCES races(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS bet_picks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bet_id INT NOT NULL,
    skier_id INT NOT NULL,
    position TINYINT NOT NULL,
    UNIQUE KEY uniq_picks_position (bet_id, position),
    UNIQUE KEY uniq_picks_skier (bet_id, skier_id),
    CONSTRAINT fk_picks_bet FOREIGN KEY (bet_id) REFERENCES bets(id) ON DELETE CASCADE,
    CONSTRAINT fk_picks_skier FOREIGN KEY (skier_id) REFERENCES skiers(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS prior_races (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fis_race_id INT NOT NULL,
    place VARCHAR(120) NOT NULL,
    place_key VARCHAR(120) NOT NULL,
    discipline ENUM('DH','SG','GS','SL','AC') NOT NULL,
    gender ENUM('W','M') NOT NULL,
    race_date DATE NOT NULL,
    result_url VARCHAR(255) NOT NULL,
    UNIQUE KEY uniq_prior_fis (fis_race_id),
    KEY idx_prior_match (place_key, discipline, gender)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS prior_finishes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prior_race_id INT NOT NULL,
    position TINYINT NOT NULL,
    skier_name VARCHAR(120) NOT NULL,
    nation CHAR(3) NOT NULL,
    UNIQUE KEY uniq_prior_finish (prior_race_id, position),
    CONSTRAINT fk_prior_finish FOREIGN KEY (prior_race_id) REFERENCES prior_races(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS race_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    race_id INT NOT NULL,
    skier_id INT NOT NULL,
    position TINYINT NOT NULL,
    UNIQUE KEY uniq_results_position (race_id, position),
    UNIQUE KEY uniq_results_skier (race_id, skier_id),
    CONSTRAINT fk_results_race FOREIGN KEY (race_id) REFERENCES races(id) ON DELETE CASCADE,
    CONSTRAINT fk_results_skier FOREIGN KEY (skier_id) REFERENCES skiers(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS tip_groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tip_groups_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS tip_group_members (
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (group_id, user_id),
    CONSTRAINT fk_tip_group_members_group FOREIGN KEY (group_id) REFERENCES tip_groups(id) ON DELETE CASCADE,
    CONSTRAINT fk_tip_group_members_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lang ENUM('en','de') NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author_id INT NOT NULL,
    body VARCHAR(300) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comments_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS race_starters (
    race_id INT NOT NULL,
    skier_id INT NOT NULL,
    start_order SMALLINT NOT NULL,
    PRIMARY KEY (race_id, skier_id),
    UNIQUE KEY uniq_race_start_order (race_id, start_order),
    CONSTRAINT fk_starters_race FOREIGN KEY (race_id) REFERENCES races(id) ON DELETE CASCADE,
    CONSTRAINT fk_starters_skier FOREIGN KEY (skier_id) REFERENCES skiers(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
];

export async function migrate(): Promise<void> {
  for (const statement of statements) await pool.query(statement);
  const columns = await query<RowDataPacket>("SHOW COLUMNS FROM users LIKE 'password_reset_at'");
  if (columns.length === 0) {
    await pool.query("ALTER TABLE users ADD COLUMN password_reset_at DATETIME NULL");
  }
  const emailIndex = await query<RowDataPacket>(
    `SELECT INDEX_NAME FROM information_schema.STATISTICS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND INDEX_NAME = 'uniq_users_email'`,
  );
  if (emailIndex.length === 0) {
    await pool.query("ALTER TABLE users ADD UNIQUE KEY uniq_users_email (email)");
  }
  const newsLang = await query<RowDataPacket>("SHOW COLUMNS FROM news LIKE 'lang'");
  if (newsLang.length === 0) {
    await pool.query("ALTER TABLE news ADD COLUMN lang ENUM('en','de') NOT NULL DEFAULT 'de'");
  }
  await ensureColumn("users", "remind_email_48", "remind_email_48 TINYINT(1) NOT NULL DEFAULT 0");
  await ensureColumn("users", "remind_email_24", "remind_email_24 TINYINT(1) NOT NULL DEFAULT 0");
  await ensureColumn("users", "remind_whatsapp", "remind_whatsapp TINYINT(1) NOT NULL DEFAULT 0");
  await ensureColumn("users", "remind_whatsapp_48", "remind_whatsapp_48 TINYINT(1) NOT NULL DEFAULT 0");
  await ensureColumn("users", "remind_whatsapp_24", "remind_whatsapp_24 TINYINT(1) NOT NULL DEFAULT 0");
  await ensureColumn("users", "whatsapp_phone", "whatsapp_phone VARCHAR(20) NULL");
  await ensureColumn("users", "prefill_after_close", "prefill_after_close TINYINT(1) NOT NULL DEFAULT 0");
  await ensureColumn(
    "bets",
    "filled",
    "filled ENUM('player','day-before','after-close') NOT NULL DEFAULT 'player'",
  );
}

async function ensureColumn(table: string, column: string, definition: string): Promise<void> {
  const columns = await query<RowDataPacket>(`SHOW COLUMNS FROM \`${table}\` LIKE ?`, [column]);
  if (columns.length === 0) await pool.query(`ALTER TABLE \`${table}\` ADD COLUMN ${definition}`);
}
