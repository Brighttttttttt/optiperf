import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sable: "#F7F5F2",
        sable2: "#F2EFEA",
        carte: "#FFFFFF",
        bordure: "#E4DFD8",
        bordure2: "#EFEAE3",
        encre: "#1A1917",
        gris: "#7A756D",
        gris2: "#A39C93",
        corail: "#D94F32",
        corailfonce: "#B03E24",
        corailpale: "#FDF3F0",
        corailbord: "#F2D5CC",
        indigo2: "#3F4CBF",
        indigofonce: "#333DA0",
        indigopale: "#F1F2FC",
        indigobord: "#D3D6F4",
        vert: "#2E6B4F",
        vertpale: "#E8F3EC"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Helvetica", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      }
    }
  },
  plugins: []
};
export default config;
