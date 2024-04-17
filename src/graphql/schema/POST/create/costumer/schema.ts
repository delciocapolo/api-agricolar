import { fileURLToPath } from "node:url";
import {gql} from "graphql-tag";
import path  from "node:path";
import { readFileSync } from "node:fs";
import { Consumidor, Localizacao } from "@prisma/client";
import { ctxType } from "../../../helpers/ContextType";
import { DatabaseConnectionPOST } from "../../../../../model/databaseConnection";
import { CostumerAndProductType } from "../../../../../model/@types/type";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const typeDefs = gql(readFileSync(path.resolve(__dirname, "schema.graphql"), {
    encoding: 'utf-8'
}));

const database = new DatabaseConnectionPOST();
export const resolvers = {
    Query: {
        done: () => "Done"
    },
    Mutation: {
        async createCostumer(
            _: any,
            data: {
                consumidor: Consumidor,
                localizacao: Localizacao
            },
            ctx: ctxType
        ) {
            const token = ctx.token.createToken;
            console.log(token);
            const costumer = await database.createCostumer(data.consumidor, data.localizacao);

            return costumer;
        },
        async createWishList(
            _: any,
            data: CostumerAndProductType
        ) {
            const wishList = await database.createWishList(data);
            return wishList;
        },
        async createCart(
            _: any,
            data: CostumerAndProductType
        ) {
            const cart = await database.addToCart(data);
            return cart;
        },
        async createFavoriteFarm(
            _: any,
            data: {}
        ) {

        }
    }
}

