export const apps = [
  {
    name: "Servers",
    instances: "2",
    exec_mode: "cluster",
    script: "./dist/bundle.js",
    env: {
      NODE_ENV: "development",
    },
  },
];
