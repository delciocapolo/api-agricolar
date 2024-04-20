import { fileURLToPath } from "node:url";
import { gql } from "graphql-tag";
import path from "node:path";
import { readFileSync } from "node:fs";
import { Consumidor, Localizacao } from "@prisma/client";
import { ctxType } from "../../../helpers/ContextType";
import { CostumerAndFarmType, CostumerAndProductType } from "../../../../../model/@types/type";
import DATESCALAR from "../../../helpers/DateScalar";
import { DatabaseConnectionPOST } from "../../../../../model/databaseConnection";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const typeDefs = gql(readFileSync(path.resolve(__dirname, "schema.graphql"), {
    encoding: 'utf-8'
}));

const database = new DatabaseConnectionPOST();
export const resolvers = {
    Date: DATESCALAR,
    Query: {
        done() {
            return "Done"
        }
    },
    Mutation: {
        createCostumer: async (
            _: any,
            { consumidor, localizacao }: {
                consumidor: Consumidor,
                localizacao: Localizacao
            },
            ctx: ctxType
        ) => {
            const token = ctx.token;
            console.log(token);
            const costumer = await database.createCostumer({ ...consumidor, data_nascimento: new Date(consumidor.data_nascimento).getTime() }, localizacao);

            return costumer;
        },
        createWishList: async (
            _: any,
            { id_consumidor, id_produto }: CostumerAndProductType
        ) => {
            const wishList = await database.createWishList({
                id_consumidor,
                id_produto
            });
            return wishList;
        },
        createCart: async (
            _: any,
            { id_consumidor, id_produto }: CostumerAndProductType
        ) => {
            const cart = await database.addToCart({
                id_consumidor,
                id_produto
            });
            return cart;
        },
        createFavoriteFarm: async (
            _: any,
            { id_consumidor, id_fazenda }: CostumerAndFarmType
        ) => {
            const favoriteFarm = await database.createFarvoriteFarm({
                id_consumidor,
                id_fazenda
            });
            return favoriteFarm;
        },
    }
}

