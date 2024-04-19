import { fileURLToPath } from "node:url";
import {gql} from "graphql-tag";
import path  from "node:path";
import { readFileSync } from "node:fs";
import { Consumidor, Localizacao } from "@prisma/client";
import { ctxType } from "../../../helpers/ContextType";
import { DatabaseConnectionPOST } from "../../../../../model/databaseConnection";
import { CostumerAndFarmType, CostumerAndProductType } from "../../../../../model/@types/type";
import DATESCALAR from "../../../helpers/DateScalar";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const typeDefs = gql(readFileSync(path.resolve(__dirname, "schema.graphql"), {
    encoding: 'utf-8'
}));

const database = new DatabaseConnectionPOST();
export const resolvers = {
    Date: DATESCALAR,
    Query: {
        done: () => "Done"
    },
    Mutation: {
        createCostumer: async (
            _: any,
            data: {
                consumidor: Consumidor,
                localizacao: Localizacao
            },
            ctx: ctxType
        ) => {
            const token = ctx.token.createToken;
            console.log(token);
            const costumer = await database.createCostumer(data.consumidor, data.localizacao);

            return costumer;
        },
        createWishList: async (
            _: any,
            data: CostumerAndProductType
        ) => {
            const wishList = await database.createWishList(data);
            return wishList;
        },
        createCart: async (
            _: any,
            data: CostumerAndProductType
        ) => {
            const cart = await database.addToCart(data);
            return cart;
        },
        createFavoriteFarm: async (
            _: any,
            data: CostumerAndFarmType
        ) => {
            const favoriteFarm = await database.createFarvoriteFarm(data);
            return favoriteFarm;
        },
    }
}

