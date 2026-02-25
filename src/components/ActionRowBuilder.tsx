import { useState } from "react";
import ButtonBuilder from "./ButtonBuilder";

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

interface Props {
  onChange: (row: ActionRow) => void;
}

export default function ActionRowBuilder({ onChange }: Props) {
  const [buttons, setButtons] = useState<ButtonComponent[]>([]);

  const handleButtonChange = (index: number, button: ButtonComponent) => {
    const newButtons = [...buttons];
    newButtons[index] = button;
    setButtons(newButtons);
    onChange({ type: 1, components: newButtons });
  };

  const addButton = () => {
    const newButton: ButtonComponent = { type: 2, style: 1 };
    const newButtons = [...buttons, newButton];
    setButtons(newButtons);
    onChange({ type: 1, components: newButtons });
  };

  return (
    <div style={{ border: "1px solid #30363d", padding: 12, borderRadius: 6, marginBottom: 12 }}>
      <h4>Action Row</h4>
      {buttons.map((btn, idx) => (
        <ButtonBuilder
          key={idx}
          onChange={(button) => handleButtonChange(idx, button)}
        />
      ))}

      {buttons.length < 5 && (
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
          onClick={addButton}
        >
          + Add Button
        </button>
      )}
    </div>
  );
}
