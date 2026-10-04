import { ImageResponse } from "next/og";

export const alt = "Collabute — Your team's context. Already in motion.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#f8f9f4",
        color: "#183e2b",
        padding: "80px",
        border: "20px solid #e7ebdf",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, marginBottom: 58 }}>
        ↗ collabute
      </div>
      <div style={{ fontSize: 76, letterSpacing: -4, lineHeight: 1.08 }}>
        Your team’s context.
      </div>
      <div
        style={{
          fontSize: 76,
          letterSpacing: -4,
          lineHeight: 1.08,
          color: "#56794d",
        }}
      >
        Already in motion.
      </div>
      <div style={{ fontSize: 24, marginTop: 36, color: "#686e64" }}>
        Less chasing. More forward motion.
      </div>
    </div>,
    size,
  );
}
