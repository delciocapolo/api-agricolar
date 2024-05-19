import { fileURLToPath } from "node:url";
import path from "node:path";
import gql from "graphql-tag";
import { readFileSync } from "node:fs";
import DATESCALAR from "../helpers/DateScalar";
import { DatabaseConnectionGET } from "../../../model/databaseConnection";
import { debug } from "node:util";
import { CustomerSchemaType } from "../CUSTOMER/@types/CustomerTypes";
import { LimitSchemaType } from "./@types/default";
import { FazendeiroSchemaType, ProdutoSchemaType } from "../FARMER/@types/default";

// const log = debug('set:rote');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathSchema = readFileSync(path.resolve(__dirname, 'schema.graphql'), { encoding: 'utf-8' });
const database = new DatabaseConnectionGET();

export const typeDefs = gql(pathSchema);
export const resolvers = {
  Date: DATESCALAR,
  ConsumidorSchema: {
    __resolveReference(arg: any, n_args: any, context: any, info: any) {
      console.log(arg, n_args, context, info);

      return {
        ...arg,
        ...n_args,
      };
    },
  },
  Query: {
    costumers: async (_: any, { limit }: LimitSchemaType) => {
      const rows = await database.getCostumers(limit);

      if (!rows) {
        return [];
      }

      return rows as CustomerSchemaType[];
    },
    farmers: async (_: any, { limit }: LimitSchemaType) => {
      const rows = await database.getFarmers(limit);

      if (!rows) {
        return [];
      }

      return rows as FazendeiroSchemaType[];
    },
    products: async (_: any, { limit }: LimitSchemaType) => {
      const rows = await database.getProducts(limit);

      if (!rows) {
        return [];
      }

      return rows as ProdutoSchemaType[];
    },
    user: async (
      _: any,
      {
        email,
      }: {
        email: string;
      }
    ) => {
      const row = await database.fromDatabaseGetUser(email);
      return row;
    },
  },
};
