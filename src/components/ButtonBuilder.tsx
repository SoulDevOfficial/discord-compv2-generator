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

const styleMap: Record<string, ButtonStyle> = {
  Primary: 1,
  Secondary: 2,
  Success: 3,
  Danger: 4,
  Link: 5,
};

interface Props {
  onChange: (button: ButtonComponent) => void;
}

export default function ButtonBuilder({ onChange }: Props) {
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

  // Notify parent whenever state changes
  const handleChange = () => onChange(button);

  return (
    <div style={{ border: "1px solid #30363d", padding: 12, borderRadius: 6, marginBottom: 12 }}>
      <div>
        <label>Label</label>
        <input
          value={label}
          onChange={(e) => { setLabel(e.target.value); handleChange(); }}
          style={{ width: "100%", marginBottom: 6 }}
        />
      </div>

      <div>
        <label>Style</label>
        <select
          value={style}
          onChange={(e) => { setStyle(Number(e.target.value) as ButtonStyle); handleChange(); }}
          style={{ width: "100%", marginBottom: 6 }}
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
          onChange={(e) => { setCustomId(e.target.value); handleChange(); }}
          style={{ width: "100%", marginBottom: 6 }}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => { setDisabled(e.target.checked); handleChange(); }}
          />
          Disabled
        </label>
      </div>
    </div>
  );
}
