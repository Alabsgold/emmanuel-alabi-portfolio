"use client";

import dynamic from "next/dynamic";

// three.js only runs in the browser; the static gradient behind it shows while it loads
// and stays as the picture where WebGL is unavailable.
const SystemsScene = dynamic(() => import("./systems-scene"), { ssr: false });

export function SceneLoader() {
  return (
    <div className="scene-layer" aria-hidden="true">
      <div className="scene-fallback" />
      <SystemsScene />
    </div>
  );
}
