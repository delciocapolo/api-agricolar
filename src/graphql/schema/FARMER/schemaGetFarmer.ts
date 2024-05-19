import { readFileSync } from "node:fs";
import gql from "graphql-tag";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Fazenda, Produto } from "@prisma/client";

import type {
    FazendaAndProduct,
    CategoriaOnly,
    FazendaAndClient,
    FazendaAndSoldProduct,
    StatisticsType,
    ClientsType,
    ClientOnlyType
} from "./@types/default";
import type {
  FarmerInputType,
  EmplyeeInputType,
  FarmInputType,
  ProductTypeInput,
  SellProductInputType,
  EmployeeTypeSchema,
} from "./@types/farmer";
import { DatabaseConnectionGET, DatabaseConnectionPOST } from "../../../model/databaseConnection";
import DATESCALAR from "../helpers/DateScalar";
import { BCRYPT_SALT, JWT_SECRET } from "../../../utils/EnvConfigs";
import AnError from "../helpers/AnError";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const typeDefs = gql(readFileSync(path.resolve(__dirname, 'schema.graphql'), { encoding: 'utf-8' }));

type ErrorObject = {
  message: string;
  path: string[];
};

const DatabaseGet = new DatabaseConnectionGET();
const DatabaseCreate = new DatabaseConnectionPOST();

export const resolvers = {
  Date: DATESCALAR,
  Query: {
    sold: async (
      _: any,
      { id_fazenda, id_monitoramento }: FazendaAndSoldProduct
    ) => {
      const row = await DatabaseGet.getSoldProduct(id_fazenda, id_monitoramento);
      if (!row) {
        console.error("ERROR TO FETCH THE MONITORING PRODUCT");
        return;
      }
      if (Object.keys(row).includes("message")) {
        console.error(row);
        return;
      }
      return row as StatisticsType;
    },
    // resolvidos
    solds: async (_: any, { id_fazenda }: FazendaAndProduct) => {
      const rows = await DatabaseGet.fromFarmGetProductSolds(id_fazenda);

      if (!rows || Object.keys(rows).includes("message")) {
        console.error(rows);
        return;
      }

      return rows as Produto[];
    },
    product: async (_: any, { id_fazenda, id_product }: FazendaAndProduct) => {
      const row = await DatabaseGet.getProduct(id_fazenda, id_product);

      if (row && Object.keys(row).includes("message")) {
        console.error(row);
        return;
      }

      return row as Produto;
    },
    products: async (_: any, { id_fazenda }: FazendaAndProduct) => {
      const row = await DatabaseGet.fromFarmGetProducts(id_fazenda);
      if (!row) {
        console.error("ERROR TO FETCH THE PRODUCTS FROM FARM");
        return;
      }
      if (Object.keys(row).includes("message")) {
        console.error(row);
        return;
      }
      return row as Produto[];
    },
    stock: async (_: any, { id_fazenda }: FazendaAndProduct) => {
      const rows = await DatabaseGet.getStock(id_fazenda);

      if (!rows) {
        console.error("ERROR TO FETCH THE STOCK FROM FARM");
        return;
      }

      if (Object.keys(rows).includes("message")) {
        console.error(rows);
        return;
      }

      return rows;
    },
    productByCategory: async (_: any, { id_categoria }: CategoriaOnly) => {
      const rows = await DatabaseGet.getProductByCategory(id_categoria);

      if (!rows) {
        console.error("ERROR TO GET PRODUCTS BY CATEGORY" + id_categoria);
        return [];
      }

      if (Object.keys(rows).includes("message")) {
        const error = rows as {
          message: string;
          path: string[];
        };
        console.log(error);
        return [];
      }
      const transform = rows as unknown as Produto[];
      return transform;
    },
    // TODO: criar a funcao responsavel por retornar um unico client, pelo ID
    client: async (_: any, { id_client, id_fazenda }: FazendaAndClient) => {
      const row = await DatabaseGet.fromFarmGetClient(id_fazenda, id_client);
      console.log(row);
      if (!row || Object.keys(row).includes("message")) {
        console.error(row);
        return;
      }
      const transform = row as unknown as ClientOnlyType[];
      return transform[0];
    },
    clients: async (_: any, { id_fazenda }: FazendaAndClient) => {
      const rows = await DatabaseGet.fromFarmGetClients(id_fazenda);
      if (!rows) {
        console.error("ERROR TRYING GET CLIENTS FROM FARM" + id_fazenda);
        return;
      }

      if (rows && Object.keys(rows).includes("message")) {
        console.error(rows);
        return;
      }

      return rows as ClientsType[];
    },
  },
  Mutation: {
    createFarmer: async (
      _: any,
      { fazendeiro, localizacao }: FarmerInputType,
      ctx: any
    ) => {
      const __ = ctx.token;
      const that = structuredClone(fazendeiro);
      const salt = bcrypt.genSaltSync(BCRYPT_SALT);
      const hash = bcrypt.hashSync(that["senha"], salt);
      const transformed = { ...that, senha: hash };
      const response = await DatabaseCreate.createFarmer({
        fazendeiro: transformed,
        localizacao,
      });

      if (!response || AnError(response)) {
        console.error("An Error, trying create [Farmer]");
        console.error(response);
        return null;
      }

      const payload = {
        email: that["email"],
        name: that["email"].split("@")[0],
      };
      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "30d",
      });

      return { token };
    },
    createFarm: async (
      _: any,
      { id_fazendeiro, farm }: FarmInputType,
      ctx: any
    ) => {
      try {
        if (!farm || typeof farm !== "object") {
          throw new Error('Objeto "fazenda" não foi fornecido corretamente.');
        }
        const __ = ctx.token;
        const row = await DatabaseCreate.createFarm({ farm, id_fazendeiro });

        if (!row) {
          console.error("RECORD WAS NOT INSERTED IN DATABASE");
          return;
        }

        if (Object.keys(row).includes("message")) {
          console.error(row);
          return;
        }

        return row as Fazenda;
      } catch (error) {
        console.error("AN ERROR OCCOURS, TRYING CREATE FARM: ");
        console.error(error);
      }
    },
    createProduct: async (
      _: any,
      { id_fazenda, nome_categoria, produto }: ProductTypeInput
    ) => {
      const response = await DatabaseCreate.createProduct({
        id_fazenda,
        nome_categoria,
        produto,
      });

      if (!response) {
        console.error("An Error, trying create [Product]");
        return;
      }

      if (Object.keys(response).includes("message")) {
        console.log(response);
        return;
      }

      return response as Produto;
    },
    sellProduct: async (
      _: any,
      { id_consumidor, id_produto }: SellProductInputType
    ) => {
      const response = await DatabaseCreate.sellProduct({
        id_consumidor,
        id_produto,
      });

      if (!response) {
        console.error("An Error, trying create [Sell Product]");
        return;
      }

      if (Object.keys(response).includes("message")) {
        console.error(response);
        return;
      }

      return response as Produto;
    },
    createEmployee: async (
      _: any,
      { id_consumidor, id_fazenda }: EmplyeeInputType
    ) => {
      const row = await DatabaseCreate.createEmployee({
        id_fazenda,
        id_consumidor,
      });

      if (!row) {
        console.error("An Error, trying create [Create Employee]");
        return;
      }

      if (Object.keys(row).includes("message")) {
        console.error(row);
        return;
      }

      return row as EmployeeTypeSchema;
    },
  },
};