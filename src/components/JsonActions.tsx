interface Props {
  data: any;
}

export default function JsonActions({ data }: Props) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert("JSON copied to clipboard!");
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "discord-components.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
      <button
        onClick={copyToClipboard}
        style={{
          padding: "6px 12px",
          borderRadius: 6,
          border: "none",
          background: "#5865f2",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Copy JSON
      </button>
      <button
        onClick={downloadJson}
        style={{
          padding: "6px 12px",
          borderRadius: 6,
          border: "none",
          background: "#3ba55d",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Download JSON
      </button>
    </div>
  );
}
