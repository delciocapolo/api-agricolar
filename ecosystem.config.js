export const apps = [
  {
    name: "Servers",
    instances: "2",
    exec_mode: "cluster",
    script: "./src/index.mjs",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
  },
];
