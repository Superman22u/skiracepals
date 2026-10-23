import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool, query } from "./db";
import { nameKey } from "./names";

type PublishedStartList = {
  raceDate: string;
  discipline: "DH" | "SG" | "GS" | "SL" | "AC";
  gender: "W" | "M";
  starters: { name: string; nation: string }[];
};

/** Sölden women GS, 24 Oct 2026. Draw order and nation codes from the FIS live draw. */
const publishedStartLists: PublishedStartList[] = [
  {
    raceDate: "2026-10-24",
    discipline: "GS",
    gender: "W",
    starters: [
  { name: "Julia Scheib", nation: "AUT" },
  { name: "Sara Hector", nation: "SWE" },
  { name: "Camille Rast", nation: "SUI" },
  { name: "Mikaela Shiffrin", nation: "USA" },
  { name: "Alice Robinson", nation: "NZL" },
  { name: "Paula Moltzan", nation: "USA" },
  { name: "Thea Louise Stjernesund", nation: "NOR" },
  { name: "Zrinka Ljutic", nation: "CRO" },
  { name: "Lara della Mea", nation: "ITA" },
  { name: "Maryna Gasienica-Daniel", nation: "POL" },
  { name: "Mina Fuerst Holtmann", nation: "NOR" },
  { name: "Nina O'Brien", nation: "USA" },
  { name: "Lara Colturi", nation: "ALB" },
  { name: "Lena Duerr", nation: "GER" },
  { name: "Britt Richardson", nation: "CAN" },
  { name: "Emma Aicher", nation: "GER" },
  { name: "Wendy Holdener", nation: "SUI" },
  { name: "Petra Vlhova", nation: "SVK" },
  { name: "Stephanie Brunner", nation: "AUT" },
  { name: "Neja Dvornik", nation: "SLO" },
  { name: "Asja Zenere", nation: "ITA" },
  { name: "Vanessa Kasper", nation: "SUI" },
  { name: "A J Hurt", nation: "USA" },
  { name: "Estelle Alphand", nation: "SWE" },
  { name: "Sue Piller", nation: "SUI" },
  { name: "Madeleine Sylvester-Davik", nation: "NOR" },
  { name: "Elisabeth Bocock", nation: "USA" },
  { name: "Marta Bassino", nation: "ITA" },
  { name: "Franziska Gritsch", nation: "AUT" },
  { name: "Hilma Loevblom", nation: "SWE" },
  { name: "Laura Pirovano", nation: "ITA" },
  { name: "Kira Weidle-Winkelmann", nation: "GER" },
  { name: "Corinne Suter", nation: "SUI" },
  { name: "Anna Trocker", nation: "ITA" },
  { name: "Doriane Escane", nation: "FRA" },
  { name: "Dania Allenbach", nation: "SUI" },
  { name: "Sophie Mathiou", nation: "ITA" },
  { name: "Ilaria Ghisalberti", nation: "ITA" },
  { name: "Francesca Baruzzi Farriol", nation: "ARG" },
  { name: "Sophie Nyberg", nation: "SWE" },
  { name: "Alice Pazzaglia", nation: "ITA" },
  { name: "Simone Wild", nation: "SUI" },
  { name: "Sohui Gim", nation: "KOR" },
  { name: "Katie Hensien", nation: "USA" },
  { name: "Mary Bocock", nation: "USA" },
  { name: "Hanna Aronsson Elfman", nation: "SWE" },
  { name: "Charlotte Lingg", nation: "LIE" },
  { name: "Stefanie Grob", nation: "SUI" },
  { name: "Giorgia Collomb", nation: "ITA" },
  { name: "Jana Fritz", nation: "GER" },
  { name: "Fabiana Dorigo", nation: "GER" },
  { name: "Shaienne Zehnder", nation: "SUI" },
  { name: "Katie Rowekamp", nation: "USA" },
  { name: "Arianne Forget", nation: "CAN" },
  { name: "Leonie Raich", nation: "AUT" },
  { name: "Tatum Bieler", nation: "ITA" },
  { name: "Iria Medina Girones", nation: "AND" },
  { name: "Natalie Falch", nation: "AUT" },
  { name: "Cassidy Gray", nation: "CAN" },
  { name: "Elena Riederer", nation: "AUT" },
  { name: "Sina Fausch", nation: "SUI" },
  { name: "Justine Lamontagne", nation: "CAN" },
  { name: "Valentina Rings-Wanner", nation: "AUT" },
  { name: "Cornelia Oehlund", nation: "SWE" },
  { name: "Ricarda Haaser", nation: "AUT" },
  { name: "Emilia Mondinelli", nation: "ITA" },
  { name: "Victoria Olivier", nation: "AUT" },
    ],
  },
];

export async function applyPublishedStartLists(): Promise<void> {
  for (const list of publishedStartLists) {
    const races = await query<RowDataPacket & { id: number }>(
      "SELECT id FROM races WHERE race_date = ? AND discipline = ? AND gender = ?",
      [list.raceDate, list.discipline, list.gender],
    );
    if (races.length !== 1) continue;
    const raceId = Number(races[0].id);
    const existing = await query<RowDataPacket & { id: number; name: string; nation: string; active: number }>(
      "SELECT id, name, nation, active FROM skiers WHERE gender = ?",
      [list.gender],
    );
    const ids: number[] = [];
    for (const starter of list.starters) {
      const key = nameKey(starter.name);
      const hits = existing.filter((skier) => nameKey(skier.name) === key);
      const hit = hits.find((skier) => skier.nation === starter.nation) ?? hits[0];
      if (hit) {
        if (hit.name === "J Hurt A") {
          await pool.query("UPDATE skiers SET name = ? WHERE id = ?", [starter.name, hit.id]);
          hit.name = starter.name;
        }
        if (Number(hit.active) !== 1) {
          await pool.query("UPDATE skiers SET active = 1 WHERE id = ?", [hit.id]);
          hit.active = 1;
        }
        ids.push(Number(hit.id));
        continue;
      }
      const [result] = await pool.query<ResultSetHeader>(
        "INSERT INTO skiers (name, nation, gender) VALUES (?, ?, ?)",
        [starter.name, starter.nation, list.gender],
      );
      const id = Number(result.insertId);
      existing.push({ id, name: starter.name, nation: starter.nation, active: 1 });
      ids.push(id);
    }
    await pool.query("DELETE FROM race_starters WHERE race_id = ?", [raceId]);
    await pool.query(
      `INSERT INTO race_starters (race_id, skier_id, start_order) VALUES ${ids.map(() => "(?, ?, ?)").join(",")}`,
      ids.flatMap((id, index) => [raceId, id, index + 1]),
    );
  }
}
