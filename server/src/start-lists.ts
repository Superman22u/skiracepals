import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool, query, withTx } from "./db";
import { StartListError, type DrawnStarter } from "./fis-live";
import { fetchFisStartList } from "./fis-results";
import { nameKey } from "./names";

type PublishedStartList = {
  raceDate: string;
  discipline: "DH" | "SG" | "GS" | "SL" | "AC";
  gender: "W" | "M";
  starters: { name: string; nation: string }[];
};

/** Sölden women GS, 24 Oct 2026. Bib order from the official FIS race page. */
const publishedStartLists: PublishedStartList[] = [
  {
    raceDate: "2026-10-24",
    discipline: "GS",
    gender: "W",
    starters: [
  { name: "Alice Robinson", nation: "NZL" },
  { name: "Julia Scheib", nation: "AUT" },
  { name: "Sara Hector", nation: "SWE" },
  { name: "Thea Louise Stjernesund", nation: "NOR" },
  { name: "Mikaela Shiffrin", nation: "USA" },
  { name: "Paula Moltzan", nation: "USA" },
  { name: "Camille Rast", nation: "SUI" },
  { name: "Britt Richardson", nation: "CAN" },
  { name: "Zrinka Ljutic", nation: "CRO" },
  { name: "Lara Colturi", nation: "ALB" },
  { name: "Mina Fuerst Holtmann", nation: "NOR" },
  { name: "Lara della Mea", nation: "ITA" },
  { name: "Lena Duerr", nation: "GER" },
  { name: "Nina O'Brien", nation: "USA" },
  { name: "Maryna Gasienica-Daniel", nation: "POL" },
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

export async function saveStartList(raceId: number, gender: "W" | "M", starters: DrawnStarter[]): Promise<void> {
  if (starters.length === 0) throw new StartListError("The official start list is not on the FIS page yet");
  const existing: { id: number; name: string; nation: string; active: number }[] = await query<
    RowDataPacket & { id: number; name: string; nation: string; active: number }
  >(
    "SELECT id, name, nation, active FROM skiers WHERE gender = ?",
    [gender],
  );
  const ids: number[] = [];
  for (const starter of starters) {
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
      [starter.name, starter.nation, gender],
    );
    const id = Number(result.insertId);
    existing.push({ id, name: starter.name, nation: starter.nation, active: 1 });
    ids.push(id);
  }
  if (new Set(ids).size !== ids.length) throw new StartListError("The FIS start list could not be read");
  await withTx(async (conn) => {
    await conn.query("DELETE FROM race_starters WHERE race_id = ?", [raceId]);
    await conn.query(
      `INSERT INTO race_starters (race_id, skier_id, start_order) VALUES ${ids.map(() => "(?, ?, ?)").join(",")}`,
      ids.flatMap((id, index) => [raceId, id, index + 1]),
    );
  });
}

export async function importStartList(raceId: number): Promise<number> {
  const races = await query<
    RowDataPacket & { gender: "W" | "M"; discipline: "DH" | "SG" | "GS" | "SL" | "AC"; fisRaceId: number | null }
  >("SELECT gender, discipline, fis_race_id AS fisRaceId FROM races WHERE id = ?", [raceId]);
  const race = races[0];
  if (!race) throw new StartListError("Race not found");
  if (race.fisRaceId == null) throw new StartListError("This race has no FIS race id");
  const list = await fetchFisStartList(Number(race.fisRaceId));
  if (list.gender && list.gender !== race.gender) throw new StartListError("That FIS page is for a different field");
  if (list.discipline && list.discipline !== race.discipline) {
    throw new StartListError("That FIS page is for a different discipline");
  }
  await saveStartList(raceId, race.gender, list.starters);
  return list.starters.length;
}

/** Fills a race that has no start list yet. A list loaded from FIS stays as it is. */
export async function applyPublishedStartLists(): Promise<void> {
  for (const list of publishedStartLists) {
    const races = await query<RowDataPacket & { id: number }>(
      "SELECT id FROM races WHERE race_date = ? AND discipline = ? AND gender = ?",
      [list.raceDate, list.discipline, list.gender],
    );
    if (races.length !== 1) continue;
    const raceId = Number(races[0].id);
    const present = await query<RowDataPacket & { c: number }>(
      "SELECT COUNT(*) AS c FROM race_starters WHERE race_id = ?",
      [raceId],
    );
    if (Number(present[0]?.c ?? 0) > 0) continue;
    await saveStartList(raceId, list.gender, list.starters);
  }
}
