import type { ButtonComponent, SelectMenu, Modal } from "../App";

export function generateComponentJSON(
  rows: ButtonComponent[][],
  selectMenus: SelectMenu[],
  modals: Modal[]
) {
  const actionRows = rows.map(row => ({
    type: 1,
    components: row,
  }));

  const selectMenuRows = selectMenus.map(menu => ({
    type: 1,
    components: [menu],
  }));

  return [...actionRows, ...selectMenuRows, ...modals];
}
