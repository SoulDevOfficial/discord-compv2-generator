import { useState } from "react";
import ActionRowBuilder from "./components/ActionRowBuilder";
import SelectMenuBuilder from "./components/SelectMenuBuilder";
import ModalBuilder from "./components/ModalBuilder";
import JsonActions from "./components/JsonActions";

interface ButtonComponent {
  type: 2;
  style: 1 | 2 | 3 | 4 | 5;
  label?: string;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

interface SelectMenu {
  type: 3;
  custom_id: string;
  options: any[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

interface Modal {
  type: 9;
  custom_id: string;
  title: string;
  components: any[];
}

type ComponentRow = { type: 1; components: (ButtonComponent | SelectMenu)[] };

export default function App() {
  const [rows, setRows] = useState<ComponentRow[]>([]);
  const [selectMenus, setSelectMenus] = useState<SelectMenu[]>([]);
  const [modals, setModals] = useState<Modal[]>([]);

  const addRow = () => setRows([...rows, { type: 1, components: [] }]);
  const removeRow = (idx: number) => setRows(rows.filter((_, i) => i !== idx));
  const removeSelectMenu = (idx: number) => setSelectMenus(selectMenus.filter((_, i) => i !== idx));
  const removeModal = (idx: number) => setModals(modals.filter((_, i) => i !== idx));

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Discord Components V2 Builder</h1>

      <div style={{ display: "flex", gap: 40, marginTop: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>Action Rows</h3>
          {rows.map((row, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <ActionRowBuilder
                onChange={(updatedRow) => {
                  const newRows = [...rows];
                  newRows[idx] = updatedRow;
                  setRows(newRows);
                }}
              />
              <button
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: "none",
                  background: "#f04747",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => removeRow(idx)}
              >
                Remove
              </button>
            </div>
          ))}

          {rows.length < 5 && (
            <button
              style={{
                marginTop: 8,
                padding: "6px 12px",
                borderRadius: 6,
                border: "none",
                background: "#5865f2",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={addRow}
            >
              + Add Action Row
            </button>
          )}

          <h3 style={{ marginTop: 24 }}>Select Menus</h3>
          {selectMenus.map((menu, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <SelectMenuBuilder
                onChange={(updatedMenu) => {
                  const newMenus = [...selectMenus];
                  newMenus[idx] = updatedMenu;
                  setSelectMenus(newMenus);
                }}
              />
              <button
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: "none",
                  background: "#f04747",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => removeSelectMenu(idx)}
              >
                Remove
              </button>
            </div>
          ))}

          {selectMenus.length < 5 && (
            <button
              style={{
                marginTop: 8,
                padding: "6px 12px",
                borderRadius: 6,
                border: "none",
                background: "#5865f2",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() =>
                setSelectMenus([...selectMenus, { type: 3, custom_id: "", options: [] }])
              }
            >
              + Add Select Menu
            </button>
          )}

          <h3 style={{ marginTop: 24 }}>Modals</h3>
          {modals.map((modal, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <ModalBuilder
                onChange={(updatedModal) => {
                  const newModals = [...modals];
                  newModals[idx] = updatedModal;
                  setModals(newModals);
                }}
              />
              <button
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: "none",
                  background: "#f04747",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => removeModal(idx)}
              >
                Remove
              </button>
            </div>
          ))}

          {modals.length < 5 && (
            <button
              style={{
                marginTop: 8,
                padding: "6px 12px",
                borderRadius: 6,
                border: "none",
                background: "#5865f2",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() => setModals([...modals, { type: 9, custom_id: "", title: "", components: [] }])}
            >
              + Add Modal
            </button>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h3>JSON Output</h3>
          <pre
            style={{
              background: "#111",
              color: "#0f0",
              padding: 16,
              borderRadius: 6,
              overflow: "auto",
            }}
          >
            {JSON.stringify(
              [
                ...rows,
                ...selectMenus.map((m) => ({ type: 1, components: [m] })),
                ...modals,
              ],
              null,
              2
            )}
          </pre>
          <JsonActions
            data={[
              ...rows,
              ...selectMenus.map((m) => ({ type: 1, components: [m] })),
              ...modals,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
