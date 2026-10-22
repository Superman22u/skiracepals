import type { RowDataPacket } from "mysql2";
import { query } from "./db";

export type GroupMember = {
  id: number;
  nickname: string;
  email: string;
};

export type StoredGroup = {
  id: number;
  name: string;
  ownerId: number;
  ownerNickname: string;
  members: GroupMember[];
};

export async function loadGroups(): Promise<StoredGroup[]> {
  const rows = await query<
    RowDataPacket & {
      id: number;
      name: string;
      ownerId: number;
      ownerNickname: string;
      userId: number | null;
      nickname: string | null;
      email: string | null;
    }
  >(
    `SELECT g.id, g.name, g.created_by AS ownerId, o.nickname AS ownerNickname,
            u.id AS userId, u.nickname, u.email
     FROM tip_groups g
     JOIN users o ON o.id = g.created_by
     LEFT JOIN tip_group_members m ON m.group_id = g.id
     LEFT JOIN users u ON u.id = m.user_id
     ORDER BY g.name, g.id, u.nickname`,
  );
  const groups = new Map<number, StoredGroup>();
  for (const row of rows) {
    let group = groups.get(Number(row.id));
    if (!group) {
      group = {
        id: Number(row.id),
        name: row.name,
        ownerId: Number(row.ownerId),
        ownerNickname: row.ownerNickname,
        members: [],
      };
      groups.set(group.id, group);
    }
    if (row.userId != null && row.nickname != null) {
      group.members.push({
        id: Number(row.userId),
        nickname: row.nickname,
        email: row.email ?? "",
      });
    }
  }
  return [...groups.values()];
}
