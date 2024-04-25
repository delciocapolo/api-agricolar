import { readFileSync } from "fs";
import gql from "graphql-tag";
import path from "path";
import { fileURLToPath } from "url";
import {
    FazendaAndProduct,
    CategoriaOnly,
    FazendaAndClient,
    FazendaAndSoldProduct,
    FazendaOnly,
    StatisticsType,
    ClientOnlyType,
    ClientsType
} from "./@types/default";
import { DatabaseConnectionGET } from "../../../../model/databaseConnection";
import { Consumidor, Produto } from "@prisma/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const typeDefs = gql(readFileSync(path.resolve(__dirname, 'schema.graphql'), { encoding: 'utf-8' }));

const database = new DatabaseConnectionGET();
export const resolvers = {
    Query: {
        sold: async (_: any, { id_fazenda, id_monitoramento }: FazendaAndSoldProduct) => {
            const row = await database.getSoldProduct(id_fazenda, id_monitoramento);
            if (!row) {
                console.error("ERROR TO FETCH THE MONITORING PRODUCT");
                return;
            }
            if (Object.keys(row).includes('message')) {
                console.error(row);
                return;
            }
            return row as StatisticsType;
        },
        // resolvidos
        solds: async (_: any, { id_fazenda }: FazendaAndProduct) => {
            const rows = await database.fromFarmGetProductSolds(id_fazenda);

            if (!rows || Object.keys(rows).includes('message')) {
                console.error(rows);
                return;
            }

            return rows as Produto[];
        },
        product: async (_: any, { id_fazenda, id_product }: FazendaAndProduct) => {
            const row = await database.getProduct(id_fazenda, id_product);

            if (row && Object.keys(row).includes('message')) {
                console.error(row);
                return;
            };

            return row as Produto;
        },
        products: async (_: any, { id_fazenda }: FazendaAndProduct) => {
            const row = await database.fromFarmGetProducts(id_fazenda);
            if (!row) {
                console.error("ERROR TO FETCH THE PRODUCTS FROM FARM");
                return;
            }
            if (Object.keys(row).includes('message')) {
                console.error(row);
                return;
            }
            return row as Produto[];
        },
        stock: async (_: any, { id_fazenda }: FazendaAndProduct) => {
            const rows = await database.getStock(id_fazenda);

            if (!rows) {
                console.error("ERROR TO FETCH THE STOCK FROM FARM");
                return;
            }

            if (Object.keys(rows).includes('message')) {
                console.error(rows);
                return;
            };

            return rows;
        },
        productByCategory: async (_: any, { id_categoria }: CategoriaOnly) => {
            const rows = await database.getProductByCategory(id_categoria);

            if (!rows) {
                console.error('ERROR TO GET PRODUCTS BY CATEGORY' + id_categoria);
                return [];
            }

            if (Object.keys(rows).includes('message')) {
                const error = rows as {
                    message: string;
                    path: string[]
                };
                console.log(error);
                return [];
            }
            const transform = rows as unknown as Produto[];
            return transform;
        },
        // TODO: criar a funcao responsavel por retornar um unico client, pelo ID
        client: async (_: any, { id_client, id_fazenda }: FazendaAndClient) => {
            const row = await database.fromFarmGetClient(id_fazenda, id_client);

            if (!row || Object.keys(row).includes('message')) {
                console.error(row);
                return;
            }
            const transform = row[0] as unknown as ClientsType;
            return transform;
        },
        clients: async (_: any, { id_fazenda }: FazendaAndClient) => {
            const rows = await database.fromFarmGetClients(id_fazenda);
            if (!rows) {
                console.error("ERROR TRYING GET CLIENTS FROM FARM" + id_fazenda);
                return;
            }

            if (rows && Object.keys(rows).includes('message')) {
                console.error(rows);
                return;
            }

            return rows as ClientsType[];
        },

    }
}