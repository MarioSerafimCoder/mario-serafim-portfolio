export type ContactSheetMode = "grid" | "index";

export const contactSheetModeStorageKey = "ms-contact-sheet-mode";

export function getDefaultContactSheetMode(coarsePointer: boolean): ContactSheetMode {
  return coarsePointer ? "index" : "grid";
}
