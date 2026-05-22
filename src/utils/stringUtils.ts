/**
 * Normalizes a string by converting it to lowercase and removing diacritics (accents/tildes).
 * e.g. "Automatización" -> "automatizacion"
 */
export const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
