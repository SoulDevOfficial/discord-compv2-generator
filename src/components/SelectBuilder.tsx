import { useState } from "react";

interface SelectOption {
  label: string;
  value: string;
  description?: string;
  default?: boolean;
}

interface SelectMenu {
  type: 3;
  custom_id: string;
  options: SelectOption[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

interface Props {
  onChange: (menu: SelectMenu) => void;
}

export default function SelectMenuBuilder({ onChange }: Props) {
  const [customId, setCustomId] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [minValues, setMinValues] = useState(1);
  const [maxValues, setMaxValues] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [options, setOptions] = useState<SelectOption[]>([]);

  const addOption = () => {
    setOptions([...options, { label: "Option", value: `option_${options.length + 1}` }]);
  };

  const updateOption = (index: number, key: keyof SelectOption, value: any) => {
    const newOptions = [...options];
    newOptions[index][key] = value;
    setOptions(newOptions);
  };

  const menu: SelectMenu = {
    type: 3,
    custom_id: customId,
    placeholder: placeholder || undefined,
    min_values: minValues,
    max_values: maxValues,
    disabled,
    options,
  };

  onChange(menu);

  return (
    <div style={{ border: "1px solid #30363d", padding: 12, borderRadius: 6, marginBottom: 12 }}>
      <h4>Select Menu</h4>
      <div>
        <label>Custom ID</label>
        <input
          value={customId}
          onChange={(e) => setCustomId(e.target.value)}
          style={{ width: "100%", marginBottom: 6 }}
        />
      </div>
      <div>
        <label>Placeholder</label>
        <input
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          style={{ width: "100%", marginBottom: 6 }}
        />
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
        <div>
          <label>Min Values</label>
          <input
            type="number"
            value={minValues}
            onChange={(e) => setMinValues(Number(e.target.value))}
            style={{ width: 60 }}
          />
        </div>
        <div>
          <label>Max Values</label>
          <input
            type="number"
            value={maxValues}
            onChange={(e) => setMaxValues(Number(e.target.value))}
            style={{ width: 60 }}
          />
        </div>
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
      <div style={{ marginTop: 8 }}>
        {options.map((opt, idx) => (
          <div key={idx} style={{ display: "flex", gap: 6, marginBottom: 4 }}>
            <input
              value={opt.label}
              onChange={(e) => updateOption(idx, "label", e.target.value)}
              placeholder="Label"
            />
            <input
              value={opt.value}
              onChange={(e) => updateOption(idx, "value", e.target.value)}
              placeholder="Value"
            />
          </div>
        ))}
        {options.length < 25 && (
          <button
            style={{
              marginTop: 6,
              padding: "4px 8px",
              borderRadius: 6,
              border: "none",
              background: "#5865f2",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={addOption}
          >
            + Add Option
          </button>
        )}
      </div>
    </div>
  );
}
