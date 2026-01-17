import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Model Picker - Curated AI model recommendations";
export const size = {
  width: 1200,
  height: 600,
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
        backgroundColor: "#fafafa",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle gradient glow */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(139, 92, 246, 0.08), transparent 70%)",
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
          gap: "20px",
          padding: "40px",
          position: "relative",
        }}
      >
        {/* Subtitle */}
        <div
          style={{
            fontSize: "15px",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#737373",
            display: "flex",
          }}
        >
          Curated AI Model Picker
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 600,
            color: "#0a0a0a",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: "750px",
            display: "flex",
          }}
        >
          Use the best model for your task
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "20px",
            color: "#737373",
            textAlign: "center",
            maxWidth: "600px",
            lineHeight: 1.5,
            display: "flex",
            marginBottom: "4px",
          }}
        >
          Hand-picked AI model recommendations for your AI agents
        </div>

        {/* Code window */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#1a1a1a",
            borderRadius: "14px",
            padding: "0",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.05)",
            width: "540px",
            overflow: "hidden",
          }}
        >
          {/* Window header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Traffic lights */}
            <div
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                backgroundColor: "#ff5f57",
                display: "flex",
              }}
            />
            <div
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                backgroundColor: "#febc2e",
                display: "flex",
              }}
            />
            <div
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                backgroundColor: "#28c840",
                display: "flex",
              }}
            />
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "monospace",
                display: "flex",
              }}
            >
              index.ts
            </div>
          </div>

          {/* Code content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "16px 20px",
              fontFamily: "monospace",
              fontSize: "13px",
              lineHeight: 1.7,
              gap: "2px",
            }}
          >
            <div style={{ display: "flex" }}>
              <span style={{ color: "#f97583" }}>const</span>
              <span style={{ color: "#e1e4e8" }}>&nbsp;response&nbsp;</span>
              <span style={{ color: "#f97583" }}>=</span>
              <span style={{ color: "#e1e4e8" }}>&nbsp;</span>
              <span style={{ color: "#f97583" }}>await</span>
              <span style={{ color: "#e1e4e8" }}>&nbsp;</span>
              <span style={{ color: "#b392f0" }}>fetch</span>
              <span style={{ color: "#e1e4e8" }}>(</span>
            </div>
            <div style={{ display: "flex", paddingLeft: "16px" }}>
              <span style={{ color: "#9ecbff" }}>
                "https://modelpicker.dev/api/v1/latest/coding"
              </span>
            </div>
            <div style={{ display: "flex" }}>
              <span style={{ color: "#e1e4e8" }}>);</span>
            </div>
            <div style={{ display: "flex" }}>
              <span style={{ color: "#f97583" }}>const</span>
              <span style={{ color: "#e1e4e8" }}>&nbsp;</span>
              <span style={{ color: "#e1e4e8" }}>{"{"}&nbsp;</span>
              <span style={{ color: "#79b8ff" }}>primary</span>
              <span style={{ color: "#e1e4e8" }}>&nbsp;{"}"}</span>
              <span style={{ color: "#e1e4e8" }}>&nbsp;</span>
              <span style={{ color: "#f97583" }}>=</span>
              <span style={{ color: "#e1e4e8" }}>&nbsp;</span>
              <span style={{ color: "#f97583" }}>await</span>
              <span style={{ color: "#e1e4e8" }}>&nbsp;response.</span>
              <span style={{ color: "#b392f0" }}>json</span>
              <span style={{ color: "#e1e4e8" }}>();</span>
            </div>
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "4px",
            fontSize: "15px",
            color: "#a1a1a1",
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              display: "flex",
            }}
          />
          modelpicker.dev
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
