import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Capacitor 配置：用于将 FrpcDesktop 前端 Web 产物打包为 Android APK。
 * 图标来自 MXLOGO 仓库（resources/icon.png）。
 */
const config: CapacitorConfig = {
  appId: "com.mx.frpcdesktop",
  appName: "FrpcDesktop",
  webDir: "dist",
  android: {
    backgroundColor: "#0B0E14"
  }
};

export default config;
