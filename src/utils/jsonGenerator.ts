import type { ComponentRow, SelectMenu, Modal } from "../App";

export function generateComponentJSON(
  rows: ComponentRow[],
  selectMenus: SelectMenu[],
  modals: Modal[]
) {
  const actionRows = rows.map(row => ({
    type: 1,
    components: row.components,
  }));

  const selectMenuRows = selectMenus.map(menu => ({
    type: 1,
    components: [menu],
  }));

  return [...actionRows, ...selectMenuRows, ...modals];
}
