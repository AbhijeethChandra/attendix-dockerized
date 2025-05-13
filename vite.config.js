import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enhanced Emotion configuration
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Fix alias for the problematic React import
      "./react-DB-N6Fzw.js": path.resolve(__dirname, "./src/fix-emotion.js"),
      "./react-FvU_FAx6.js": path.resolve(__dirname, "./src/fix-emotion.js"),
      "@emotion/react": path.resolve(__dirname, "node_modules/@emotion/react"),
    },
  },
  optimizeDeps: {
    // Force include React and Emotion to prevent initialization issues
    include: ["react", "react-dom", "@emotion/react", "@emotion/styled"],
    // Force proper evaluation order
    esbuildOptions: {
      mainFields: ["module", "main"],
      resolveExtensions: [".js", ".jsx"],
    },
  },
  build: {
    commonjsOptions: {
      // Ensure React is properly initialized
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        // Prevent code splitting for React and Emotion
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("@emotion")) {
              return "vendor-react-emotion";
            }
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
