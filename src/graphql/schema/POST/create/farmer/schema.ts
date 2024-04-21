import path from "node:path";
import { readFileSync } from "node:fs";
import { gql } from "graphql-tag";
import { fileURLToPath } from "node:url";
import bcrypt from "bcrypt";
import { Fazenda, Produto } from "@prisma/client";
// local modules
import DATESCALAR from "../../../helpers/DateScalar";
import { DatabaseConnectionPOST } from "../../../../../model/databaseConnection";
import { ctxType } from "../../../helpers/ContextType";
import {
  FarmerInputType,
  EmplyeeInputType,
  FarmInputType,
  ProductTypeInput,
  SellProductInputType
} from "../@types/farmer";
import { BCRYPT_SALT } from "../../../../../utils/EnvConfigs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const typeDefs = gql(
  readFileSync(path.resolve(__dirname, "schema.graphql"), {
    encoding: "utf-8",
  })
);

const database = new DatabaseConnectionPOST();
export const resolvers = {
  Date: DATESCALAR,
  Query: {
    done() {
      return "Create user route defined!"
    },
  },
  Mutation: {
    createFarmer: async (_: any, { fazendeiro, localizacao }: FarmerInputType, ctx: ctxType) => {
      const __ = ctx.token;

      const that = { ...fazendeiro };
      const salt = bcrypt.genSaltSync(BCRYPT_SALT);
      const hash = bcrypt.hashSync(that.senha, salt);
      const transformed = { ...that, senha: hash };
      const response = await database.createFarmer({ fazendeiro: transformed, localizacao });

      if (!response) {
        console.error("An Error, trying create [Farmer]");
        return null;
      }

      return response;
    },
    createFarm: async (_: any, { id_fazendeiro, farm }: FarmInputType, ctx: ctxType) => {
      try {
        if (!farm || typeof farm !== 'object') {
          throw new Error('Objeto \"fazenda\" não foi fornecido corretamente.');
        }
        const __ = ctx.token;
        const row = await database.createFarm({ farm, id_fazendeiro });

        if (!row) {
          console.error("RECORD WAS NOT INSERTED IN DATABASE");
          return;
        }

        if (Object.keys(row).includes('message')) {
          console.error(row);
          return;
        }

        return row as Fazenda;
      } catch (error) {
        console.error('AN ERROR OCCOURS, TRYING CREATE FARM: ');
        console.error(error);
      }
    },
    createProduct: async (_: any, { id_fazenda, nome_categoria, produto }: ProductTypeInput) => {
      console.log(produto);

      const response = await database.createProduct({
        id_fazenda,
        nome_categoria,
        produto
      });

      if (!response) {
        console.error("An Error, trying create [Product]");
        return;
      }

      if (Object.keys(response).includes('message')) {
        console.log(response);
        return;
      }

      response as Produto;
    },
    sellProduct: async (_: any, { id_consumidor, id_produto }: SellProductInputType, ctx: ctxType) => {
      const response = await database.sellProduct({
        id_consumidor,
        id_produto
      });

      if (!response) {
        console.error("An Error, trying create [Sell Product]");
        return null;
      }

      return response;
    },
    createEmployee: async (_: any, { id_consumidor, id_fazenda }: EmplyeeInputType, ctx: ctxType) => {
      const response = await database.createEmployee({
        id_fazenda,
        id_consumidor,
        privilegio: "Employee"
      });

      if (!response) {
        console.error("An Error, trying create [Create Employee]");
        return;
      }

      return response;
    }
  }
};
