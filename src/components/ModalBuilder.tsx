import { useState } from "react";

interface TextInput {
  type: 4;
  custom_id: string;
  style: 1 | 2;
  label: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
}

interface Modal {
  type: 9;
  custom_id: string;
  title: string;
  components: { type: 1; components: TextInput[] }[];
}

interface Props {
  onChange: (modal: Modal) => void;
}

export default function ModalBuilder({ onChange }: Props) {
  const [customId, setCustomId] = useState("");
  const [title, setTitle] = useState("");
  const [inputs, setInputs] = useState<TextInput[]>([]);

  const addInput = () => {
    setInputs([
      ...inputs,
      { type: 4, custom_id: `input_${inputs.length + 1}`, style: 1, label: "Input" },
    ]);
  };

  const updateInput = (index: number, key: keyof TextInput, value: any) => {
    const newInputs = [...inputs];
    newInputs[index][key] = value;
    setInputs(newInputs);
  };

  const modal: Modal = {
    type: 9,
    custom_id: customId,
    title,
    components: inputs.map((input) => ({ type: 1, components: [input] })),
  };

  onChange(modal);

  return (
    <div style={{ border: "1px solid #30363d", padding: 12, borderRadius: 6, marginBottom: 12 }}>
      <h4>Modal</h4>
      <div>
        <label>Custom ID</label>
        <input
          value={customId}
          onChange={(e) => setCustomId(e.target.value)}
          style={{ width: "100%", marginBottom: 6 }}
        />
      </div>
      <div>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: 6 }}
        />
      </div>

      {inputs.map((input, idx) => (
        <div key={idx} style={{ border: "1px solid #444", padding: 6, borderRadius: 6, marginBottom: 6 }}>
          <label>Label</label>
          <input
            value={input.label}
            onChange={(e) => updateInput(idx, "label", e.target.value)}
            style={{ width: "100%", marginBottom: 4 }}
          />
          <label>Custom ID</label>
          <input
            value={input.custom_id}
            onChange={(e) => updateInput(idx, "custom_id", e.target.value)}
            style={{ width: "100%", marginBottom: 4 }}
          />
        </div>
      ))}

      {inputs.length < 5 && (
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
          onClick={addInput}
        >
          + Add Input
        </button>
      )}
    </div>
  );
}
