import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Model Picker - Curated AI model recommendations";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f0f0f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle gradient background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.15), transparent)",
          display: "flex",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          display: "flex",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Logo/Icon - matching favicon design */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
          }}
        >
          {/* Crosshair icon */}
          <svg
            width="60"
            height="60"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="16"
              y1="6"
              x2="16"
              y2="12"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="16"
              y1="20"
              x2="16"
              y2="26"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="6"
              y1="16"
              x2="12"
              y2="16"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="20"
              y1="16"
              x2="26"
              y2="16"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="16" cy="16" r="5" fill="white" />
            <circle cx="9" cy="9" r="2.5" fill="white" opacity="0.5" />
            <circle cx="23" cy="9" r="2.5" fill="white" opacity="0.5" />
            <circle cx="9" cy="23" r="2.5" fill="white" opacity="0.5" />
            <circle cx="23" cy="23" r="2.5" fill="white" opacity="0.5" />
          </svg>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "18px",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.5)",
            display: "flex",
          }}
        >
          Curated AI Model Picker
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 600,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: "900px",
            display: "flex",
          }}
        >
          Use the best model for your task
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255, 255, 255, 0.6)",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.5,
            display: "flex",
          }}
        >
          Hand-picked AI model recommendations for your agents
        </div>

        {/* URL badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "16px",
            padding: "12px 24px",
            borderRadius: "100px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#22c55e",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.8)",
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            modelpicker.dev
          </span>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
