import path from "node:path";
import { readFileSync } from "node:fs";
import { gql } from "graphql-tag";
import { fileURLToPath } from "node:url";

import DATESCALAR from "../../../helpers/DateScalar";
import { Fazenda, Fazendeiro, Localizacao, Produto } from "@prisma/client";
import { DatabaseConnectionPOST } from "../../../../../model/databaseConnection";
import { ctxType } from "../../../helpers/ContextType";
import { CreateProductType } from "../../../../../model/@types/type";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(import.meta.url);

// Types
type CreateProductTypeSchema = {
  credentials: CreateProductType,
  produto: Produto;
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
    async createFarmer(
      _: any,
      data: { fazendeiro: Fazendeiro; localizacao: Localizacao },
      ctx: ctxType
    ) {
      const token = ctx.token.createToken;
      console.log(token);

      const response = await database.createFarmer(
        data.fazendeiro,
        data.localizacao
      );

      if (!response) {
        console.error("An Error, trying create [Farmer]");
        return;
      }

      return response;
    },
    async createFarm(
      _: any,
      data: { id_fazendeiro: string; fazenda: Fazenda; }
    ) {
      const response = await database.createFarm( { id_fazendeiro: data.id_fazendeiro, }, data.fazenda );

      if (!response) {
        console.error("An Error, trying create [Farm]");
        return;
      }

      return response;
    },
    async createProduct(
        _: any,
        data: CreateProductTypeSchema
    ) {
        const response = await database.createProduct(
            { 
              id_fazenda: data.credentials.id_fazenda,
              categoria: data.credentials.categoria
            },
            data.produto
        );

        if (!response) {
          console.error("An Error, trying create [Product]");
          return;
        }

        return response;
    }
  },
  async sellProduct(
    _: any,
    data: {
      id_fazenda: string;
      id_produto: string;
    }
  ) {
    const response = await database.sellProduct({
      id_fazenda: data.id_fazenda, 
      id_produto: data.id_produto
    });

    if (!response) {
      console.error("An Error, trying create [Sell Product]");
      return;
    }

    return response;
  },
  async createEmployee(
    _: any,
    data: {
      id_fazenda: string;
      id_consumidor: string
    }
  ) {
    const response = await database.createEmployee({
      id_fazenda: data.id_fazenda,
      id_consumidor: data.id_consumidor,
      privilegio: "Employee"
    });

    if (!response) {
      console.error("An Error, trying create [Create Employee]");
      return;
    }

    return response;
  }
};
