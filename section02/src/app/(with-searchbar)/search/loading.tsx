export default function Loading() {
  return (
    <div style={containerStyle}>
      <div style={dotStyle}></div>
      <div style={dotStyle}></div>
      <div style={dotStyle}></div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  position: "fixed",
  inset: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  gap: "8px",
  zIndex: 1,
  background: "rgba(0,0,0,0.5)",
};

const dotStyle: React.CSSProperties = {
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: "#fff",
};
