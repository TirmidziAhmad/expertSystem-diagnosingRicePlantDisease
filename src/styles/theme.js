import { createSystem } from "@chakra-ui/react";
import { defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
  cssVarsRoot: ":where(:root, :host)",
  cssVarsPrefix: "ck",
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
    },
  },
  theme: {
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    tokens: {
      colors: {
        red: "#EE0F0F",
      },
    },
    semanticTokens: {
      colors: {
        danger: { value: "{colors.red}" },
      },
    },
    keyframes: {
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
  },
  conditions: {
    cqSm: "@container(min-width: 320px)",
    child: "& > *",
  },
})

export default createSystem(config);
