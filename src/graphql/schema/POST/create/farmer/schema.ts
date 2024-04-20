import path from "node:path";
import { readFileSync } from "node:fs";
import { gql } from "graphql-tag";
import { fileURLToPath } from "node:url";
import bcrypt from "bcrypt";
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
    createFarmer: async (
      _: any,
      { fazendeiro, localizacao }: FarmerInputType,
      ctx: ctxType
    ) => {
      const token = ctx.token;
      console.log(token);

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
    createFarm: async (
      _: any,
      { fazenda, id_fazendeiro }: FarmInputType
    ) => {
      const response = await database.createFarm({ id_fazendeiro, fazenda });

      if (!response) {
        console.error("An Error, trying create [Farm]");
        return;
      }

      return response;
    },
    createProduct: async (
      _: any,
      { id_fazenda, nome_categoria, produto }: ProductTypeInput
    ) => {
      const response = await database.createProduct({
        id_fazenda,
        nome_categoria,
        produto
      });

      if (!response) {
        console.error("An Error, trying create [Product]");
        return;
      }

      return response;
    },
    sellProduct: async (
      _: any,
      { id_consumidor, id_produto }: SellProductInputType
    ) => {
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
    createEmployee: async (
      _: any,
      { id_consumidor, id_fazenda }: EmplyeeInputType
    ) => {
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
