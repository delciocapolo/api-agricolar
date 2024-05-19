import { fileURLToPath } from "node:url";
import path from "node:path";
import gql from "graphql-tag";
import { readFileSync } from "node:fs";
import DATESCALAR from "../helpers/DateScalar";
import { DatabaseConnectionGET } from "../../../model/databaseConnection";
// const log = debug('set:rote');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathSchema = readFileSync(path.resolve(__dirname, 'schema.graphql'), { encoding: 'utf-8' });
const database = new DatabaseConnectionGET();
export const typeDefs = gql(pathSchema);
export const resolvers = {
    Date: DATESCALAR,
    ConsumidorSchema: {
        __resolveReference(arg, n_args, context, info) {
            console.log(arg, n_args, context, info);
            return {
                ...arg,
                ...n_args,
            };
        },
    },
    Query: {
        costumers: async (_, { limit }) => {
            const rows = await database.getCostumers(limit);
            if (!rows) {
                return [];
            }
            return rows;
        },
        farmers: async (_, { limit }) => {
            const rows = await database.getFarmers(limit);
            if (!rows) {
                return [];
            }
            return rows;
        },
        products: async (_, { limit }) => {
            const rows = await database.getProducts(limit);
            if (!rows) {
                return [];
            }
            return rows;
        },
        user: async (_, { email, }) => {
            const row = await database.fromDatabaseGetUser(email);
            return row;
        },
    },
};
//# sourceMappingURL=schemaSet.js.map