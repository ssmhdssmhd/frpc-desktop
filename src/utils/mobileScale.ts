/**
 * 手机端（Capacitor Android WebView）整页缩放适配。
 *
 * 桌面 UI 按 900px 宽度设计（与 Electron 默认窗口 900x600 一致），
 * 在窄屏手机上直接渲染会把内容挤压、截断。这里用 CSS zoom
 * （Android WebView 基于 Chromium，支持该属性）把整页等比缩小，
 * 使桌面布局恰好铺满屏宽，整体看起来更紧凑、不再拥挤。
 */

const DESIGN_WIDTH = 900;

function isMobileRuntime(): boolean {
  const cap = (window as any).Capacitor;
  return !!(
    cap &&
    (cap.isNativePlatform?.() || cap.getPlatform?.() === "android")
  );
}

export function applyMobileScale(): void {
  // 仅在 Capacitor 原生运行时缩放；浏览器中可用 ?mobilescale=1 预览手机效果
  const forced =
    new URLSearchParams(window.location.search).get("mobilescale") === "1";
  if (!isMobileRuntime() && !forced) return;

  const apply = () => {
    const vw = window.innerWidth;
    const scale = vw >= DESIGN_WIDTH ? 1 : vw / DESIGN_WIDTH;
    document.documentElement.style.zoom = scale.toFixed(4);
  };

  apply();
  window.addEventListener("resize", apply);
}
