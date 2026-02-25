import { useState } from "react";

type ButtonStyle = 1 | 2 | 3 | 4 | 5;

interface ButtonComponent {
  type: 2;
  style: ButtonStyle;
  label?: string;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

interface ActionRow {
  type: 1;
  components: ButtonComponent[];
}

const styleMap: Record<string, ButtonStyle> = {
  Primary: 1,
  Secondary: 2,
  Success: 3,
  Danger: 4,
  Link: 5,
};

export default function App() {
  const [label, setLabel] = useState("");
  const [customId, setCustomId] = useState("");
  const [style, setStyle] = useState<ButtonStyle>(1);
  const [disabled, setDisabled] = useState(false);

  const button: ButtonComponent = {
    type: 2,
    style,
    label: label || undefined,
    custom_id: style !== 5 ? customId || undefined : undefined,
    url: style === 5 ? customId || undefined : undefined,
    disabled,
  };

  const actionRow: ActionRow = {
    type: 1,
    components: [button],
  };

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Discord Components V2 Builder</h1>

      <div style={{ display: "flex", gap: 40, marginTop: 20 }}>
        <div style={{ minWidth: 300 }}>
          <div>
            <label>Label</label>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              style={{ width: "100%", marginBottom: 10 }}
            />
          </div>

          <div>
            <label>Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(Number(e.target.value) as ButtonStyle)}
              style={{ width: "100%", marginBottom: 10 }}
            >
              {Object.entries(styleMap).map(([name, value]) => (
                <option key={name} value={value}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>{style === 5 ? "URL" : "Custom ID"}</label>
            <input
              value={customId}
              onChange={(e) => setCustomId(e.target.value)}
              style={{ width: "100%", marginBottom: 10 }}
            />
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              Disabled
            </label>
          </div>
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
            {JSON.stringify(actionRow, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
