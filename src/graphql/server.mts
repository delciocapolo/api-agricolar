import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloGateway } from "@apollo/gateway";
import { readFileSync } from "fs";
import path from "node:path";
import { fileURLToPath } from "url";

const routes = [
  { name: "farmer", url: "http://localhost:5051/v1/farmer" },
  { name: "customer", url: "http://localhost:5050/v1/customer" },
  { name: "set", url: "http://localhost:5052/v1/set" },
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

const supergraphSdl = readFileSync(path.resolve(__dirname,"../../router/prod-schema.graphql")).toString();

const gateway = new ApolloGateway({
  supergraphSdl,
});

const server = new ApolloServer({
  gateway,
  introspection: true
});

// Note the top-level `await`!
const { url } = await startStandaloneServer(server);
console.log(`🚀  Server ready at ${url}`);
