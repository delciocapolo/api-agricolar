import { fileURLToPath } from "node:url";
import path from "node:path";
import gql from "graphql-tag";
import { readFileSync } from "node:fs";
import DATESCALAR from "../../helpers/DateScalar";
import { DatabaseConnectionGET } from "../../../../model/databaseConnection";
import { debug } from "node:util";
import { Consumidor, Fazendeiro, Produto } from "@prisma/client";

const log = debug('set:rote');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathSchema = readFileSync(path.resolve(__dirname, 'schema.graphql'), { encoding: 'utf-8' });
const database = new DatabaseConnectionGET();

export const typeDefs = gql(pathSchema);
export const resolvers = {
    Date: DATESCALAR,
    Query: {
        costumers: async () => {
            const rows = await database.getCostumers();
            if (!rows) {
                log('ROW IS [UNDEFINED], AN ERROR OCCOURS TRYING GET COSTUMERS');
                return;
            }
            if (Object.keys(rows).includes('message')) {
                console.error(rows);
                return;
            }
            return rows as Consumidor[];
        },
        farmers: async () => {
            const rows = await database.getFarmers();
            if (!rows) {
                log('ROW IS [UNDEFINED], AN ERROR OCCOURS TRYING GET FARMERS');
                return;
            }
            if (Object.keys(rows).includes('message')) {
                console.error(rows);
                return;
            }
            return rows as Fazendeiro[];
        },
        products: async () => {
            const rows = await database.getProducts();
            if (!rows) {
                log('ROW IS [UNDEFINED], AN ERROR OCCOURS TRYING GET PRODUCTS');
                return;
            }
            if (Object.keys(rows).includes('message')) {
                console.error(rows);
                return;
            }
            return rows as Produto[];
        },
        user: async (
            _: any,
            { email }: {
                email: string
            }
        ) => {
            const row = await database.fromDatabaseGetUser(email);
            return row;
        }
    }
}
