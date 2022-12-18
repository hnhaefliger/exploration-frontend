import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules"],
};

export default config;
