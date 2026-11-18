import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// The preview card shown when the site is shared on WhatsApp, LinkedIn, X or Slack.
export const alt = `${site.name}, ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#eeecea",
          backgroundImage:
            "linear-gradient(rgba(154,111,12,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(154,111,12,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#333231",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, color: "#9a6f0c" }}>ALABSGOLD</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>{site.name}</div>
          <div style={{ marginTop: 20, fontSize: 36, color: "#605f5e" }}>Founder &amp; Lead Systems Engineer</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#605f5e" }}>
          Backend · Payments · Secure platforms · Nigeria → the world
        </div>
      </div>
    ),
    size,
  );
}
