import path from "node:path";
import { readFileSync } from "node:fs";
import { gql } from "graphql-tag";
import { fileURLToPath } from "node:url";

import DATESCALAR from "../../../helpers/DateScalar";
import { DatabaseConnectionPOST } from "../../../../../model/databaseConnection";
import { ctxType } from "../../../helpers/ContextType";
import { CreateProductType } from "../../../../../model/@types/type";
import { Fazenda, Fazendeiro, Localizacao, Produto } from "../../../../../model/@types/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Types
type CreateProductTypeSchema = {
  credentials: CreateProductType,
  produto: Produto;
}
type SellProductTypeSchema = {
  id_fazenda: string;
  id_produto: string;
}
type EmployeeTypeSchema = {
  id_fazenda: string;
  id_consumidor: string;
}
type CreateFarmer = { 
  fazendeiro: Fazendeiro; 
  localizacao: Localizacao 
}
type CreateFarm = { 
  id_fazendeiro: string; 
  fazenda: Fazenda; 
}
export const typeDefs = gql(
  readFileSync(path.resolve(__dirname, "schema.graphql"), {
    encoding: "utf-8",
  })
);

const database = new DatabaseConnectionPOST();
export const resolvers = {
  Date: DATESCALAR,
  Query: {
    done: () => console.log("Create user route defined!"),
  },
  Mutation: {
    createFarmer: async (
      _: any,
      {fazendeiro, localizacao}: CreateFarmer,
      ctx: ctxType
    ) => {
      const token = ctx.token.createToken;
      console.log(token);

      const response = await database.createFarmer(
        fazendeiro,
        localizacao
      );

      if (!response) {
        console.error("An Error, trying create [Farmer]");
        return null;
      }

      return response;
    },
    createFarm: async (
      _: any,
      {fazenda, id_fazendeiro}: CreateFarm
    ) => {
      const response = await database.createFarm( { id_fazendeiro }, fazenda );

      if (!response) {
        console.error("An Error, trying create [Farm]");
        return;
      }

      return response;
    },
    createProduct: async (
        _: any,
        {credentials, produto}: CreateProductTypeSchema
    ) => {
        const response = await database.createProduct(
            { 
              id_fazenda: credentials.id_fazenda,
              categoria: credentials.categoria
            },
            produto
        );

        if (!response) {
          console.error("An Error, trying create [Product]");
          return;
        }

        return response;
    },
    sellProduct: async (
      _: any,
      {id_fazenda, id_produto}: SellProductTypeSchema
    ) => {
      const response = await database.sellProduct({
        id_fazenda, 
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
      {id_consumidor,id_fazenda}: EmployeeTypeSchema
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
