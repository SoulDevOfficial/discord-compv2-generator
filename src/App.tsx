import { useState } from "react";
import ActionRowBuilder from "./components/ActionRowBuilder";
import SelectMenuBuilder from "./components/SelectMenuBuilder";
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

type ComponentRow = { type: 1; components: (ButtonComponent | SelectMenu)[] };

export default function App() {
  const [rows, setRows] = useState<ComponentRow[]>([]);
  const [selectMenus, setSelectMenus] = useState<SelectMenu[]>([]);

  const addRow = () => setRows([...rows, { type: 1, components: [] }]);

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Discord Components V2 Builder</h1>

      <div style={{ display: "flex", gap: 40, marginTop: 20 }}>
        <div style={{ flex: 1 }}>
          {rows.map((row, idx) => (
            <ActionRowBuilder
              key={idx}
              onChange={(updatedRow) => {
                const newRows = [...rows];
                newRows[idx] = updatedRow;
                setRows(newRows);
              }}
            />
          ))}

          <button
            style={{
              marginTop: 12,
              padding: "8px 16px",
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

          <h3 style={{ marginTop: 24 }}>Select Menus</h3>
          {selectMenus.map((menu, idx) => (
            <SelectMenuBuilder
              key={idx}
              onChange={(updatedMenu) => {
                const newMenus = [...selectMenus];
                newMenus[idx] = updatedMenu;
                setSelectMenus(newMenus);
              }}
            />
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
            {JSON.stringify([...rows, ...selectMenus.map((m) => ({ type: 1, components: [m] }))], null, 2)}
          </pre>
          <JsonActions
            data={[...rows, ...selectMenus.map((m) => ({ type: 1, components: [m] }))]}
          />
        </div>
      </div>
    </div>
  );
}
