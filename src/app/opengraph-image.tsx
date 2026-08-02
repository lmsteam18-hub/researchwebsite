import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generate on-demand rather than at build time. Avoids a Windows-only
// build error in @vercel/og (paths with spaces) and keeps the image fresh.
export const dynamic = "force-dynamic";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #7c4dff 0%, #6d28f7 45%, #3366ff 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div style={{ fontSize: 44, fontWeight: 800 }}>{siteConfig.name}</div>
        </div>
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
          Professional academic research support
        </div>
        <div style={{ fontSize: 32, marginTop: 28, opacity: 0.9, maxWidth: 900 }}>
          Proposals · Dissertations · Data analysis · Editing · Publication support
        </div>
      </div>
    ),
    { ...size },
  );
}
