import * as farmer from "../FARMER/schemaFarmer";
import * as costumer from "../CUSTOMER/schemaCustomer";
import * as set from "../SET/schemaSet";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import gql from "graphql-tag";
import DATESCALAR from "../helpers/DateScalar";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const typeDefs = gql(fs.readFileSync(path.resolve(__dirname, "schema.graphql"), {encoding: "utf-8"}));

export const resolvers = {
    Date: DATESCALAR,
  Query: {
    ...farmer["resolvers"]["Query"],
    ...costumer["resolvers"]["Query"],
    ...set["resolvers"]["Query"],
  },
  Mutation: {
    ...farmer["resolvers"]["Mutation"],
    ...costumer["resolvers"]["Mutation"],
  },
};