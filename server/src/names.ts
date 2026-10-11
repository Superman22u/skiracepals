export function placeKey(place: string): string {
  const withoutRegion = place.replace(/,\s*[A-Za-z]{2,3}$/u, "");
  return withoutRegion
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/['’.]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Same key for "SHIFFRIN Mikaela" and "Mikaela Shiffrin", including ae/oe/ue spellings. */
export function nameKey(name: string): string {
  const plain = name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/ae/g, "a")
    .replace(/oe/g, "o")
    .replace(/ue/g, "u");
  return plain
    .split(/[^a-z]+/)
    .filter(Boolean)
    .sort()
    .join("");
}
