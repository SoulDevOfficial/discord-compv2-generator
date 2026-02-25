import { useState } from "react";
import ActionRowBuilder from "./components/ActionRowBuilder";
import JsonActions from "./components/JsonActions";

interface ButtonComponent {
  type: 2;
  style: 1 | 2 | 3 | 4 | 5;
  label?: string;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

interface ActionRow {
  type: 1;
  components: ButtonComponent[];
}

export default function App() {
  const [rows, setRows] = useState<ActionRow[]>([]);

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
            {JSON.stringify(rows, null, 2)}
          </pre>
          <JsonActions data={rows} />
        </div>
      </div>
    </div>
  );
}
