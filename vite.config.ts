import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "./src/api"),
      "@atoms": path.resolve(__dirname, "./src/components/atoms"),
      "@dialogs": path.resolve(__dirname, "./src/components/dialogs"),
      "@molecules": path.resolve(__dirname, "./src/components/molecules"),
      "@organisms": path.resolve(__dirname, "./src/components/organisms"),
      "@pages": path.resolve(__dirname, "./src/components/pages"),
      "@templates": path.resolve(__dirname, "./src/components/templates"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@routes": path.resolve(__dirname, "./src/routes/index.ts"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types.ts"),
    },
  },
  plugins: [react()],
});
