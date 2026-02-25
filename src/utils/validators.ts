import type { ButtonComponent, SelectMenu, Modal } from "../App";

export function validateButtons(buttons: ButtonComponent[]) {
  if (buttons.length > 5) return false;

  return buttons.every(button => 
    button.type === 2 && 
    button.style >= 1 && button.style <= 5
  );
}

export function validateSelectMenu(menu: SelectMenu) {
  if (menu.type !== 3) return false;

  if (menu.options.length > 25) return false;

  return true;
}

export function validateModal(modal: Modal) {
  if (modal.type !== 9) return false;
  
  if (modal.components.length > 5) return false;

  return true;
}
