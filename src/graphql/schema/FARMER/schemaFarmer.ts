import { readFileSync } from "node:fs";
import gql from "graphql-tag";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jwt from "jsonwebtoken";

import type {
    FazendaAndProduct,
    CategoriaOnly,
    FazendaAndClient,
    FazendaAndSoldProduct,
    StatisticsType,
    ClientsType,
    ClientOnlyType,
    FazendeiroSchemaType,
    ProdutoSchemaType,
    StockSchemaType
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
import { JWT_SECRET } from "../../../utils/EnvConfigs";
import AnError from "../helpers/AnError";
import { CriptoPassword } from "../helpers/CriptoPassword";
import { ErrorObjectType } from "../../@types/graphqlType";
import { CustomerSchemaType, FazendaSchemaType } from "../CUSTOMER/@types/CustomerTypes";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const typeDefs = gql(readFileSync(path.resolve(__dirname, 'schema.graphql'), { encoding: 'utf-8' }));

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

      if (!row || AnError(row)) {
        const error = row as ErrorObjectType;
        return error['error'];
      }
      
      return row as StatisticsType;
    },
    // resolvidos
    solds: async (_: any, { id_fazenda }: FazendaAndProduct) => {
      const rows = await DatabaseGet.fromFarmGetProductSolds(id_fazenda);

      if (!rows || AnError(rows)) {
        const error = rows as ErrorObjectType;
        return error['error'];
      }

      return rows as ProdutoSchemaType[];
    },

    product: async (_: any, { id_fazenda, id_product }: FazendaAndProduct) => {
      const row = await DatabaseGet.fromFarmGetProduct(id_fazenda, id_product);

      if (!row || AnError(row)) {
        const error = row as ErrorObjectType;
        return error['error'];
      }

      return row as ProdutoSchemaType;
    },

    productsByFarm: async (_: any, { id_fazenda }: FazendaAndProduct) => {
      const rows = await DatabaseGet.fromFarmGetProducts(id_fazenda);

      if (!rows || AnError(rows)) {
        const error = rows as ErrorObjectType;
        return error['error'];
      }

      return rows as ProdutoSchemaType[];
    },

    stock: async (_: any, { id_fazenda }: FazendaAndProduct) => {
      const rows = await DatabaseGet.fromFarmGetStock(id_fazenda);

      if (!rows || AnError(rows)) {
        const error = rows as ErrorObjectType;
        return error["error"];
      }

      return rows as StockSchemaType[];
    },

    productByCategory: async (_: any, { id_categoria }: CategoriaOnly) => {
      const rows = await DatabaseGet.getProductByCategory(id_categoria);

      if (!rows || AnError(rows)) {
        const error = rows as ErrorObjectType;
        return error["error"];
      }

      const transform = rows as ProdutoSchemaType[];
      return transform;
    },

    client: async (_: any, { id_client, id_fazenda }: FazendaAndClient) => {
      const row = await DatabaseGet.fromFarmGetClient(id_fazenda, id_client);
      
      if (!row || AnError(row)) {
        const error = row as ErrorObjectType;
        return error['error'];
      }

      const transform = row as unknown as CustomerSchemaType;
      return transform;
    },

    clients: async (_: any, { id_fazenda }: FazendaAndClient) => {
      const rows = await DatabaseGet.fromFarmGetClients(id_fazenda);
      
      if (!rows || AnError(rows)) {
        const error = rows as ErrorObjectType;
        return error["error"];
      }

      return rows as unknown as CustomerSchemaType[];
    },
  },

  Mutation: {
    createFarmer: async (
      _: any,
      { fazendeiro, localizacao }: FarmerInputType,
    ) => {
      if(!fazendeiro || !localizacao) {
        throw new Error('Os campos não podem estar vazios!');
      }

      const transform = CriptoPassword(fazendeiro);
      const row = await DatabaseCreate.createFarmer({
        fazendeiro: transform,
        localizacao,
      });

      if (!row || AnError(row)) {
        const error = row as ErrorObjectType;
        return error['error'];
      }

      const payload = {
        email: fazendeiro["email"],
      };
      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "30d",
      });

      const datas = row as unknown as FazendeiroSchemaType;
      return { fazendeiro: datas, token };
    },

    createFarm: async (
      _: any,
      { id_fazendeiro, farm }: FarmInputType,
    ) => {
      if(!id_fazendeiro || !farm) {
        throw new Error('Os campos não podem estar vazios!');
      }

      const rows = await DatabaseCreate.createFarm({ farm, id_fazendeiro });

      if (!rows || AnError(rows)) {
        const error = rows as ErrorObjectType;
        return error["error"];
      }

      return rows as FazendaSchemaType;
    },
    createProduct: async (
      _: any,
      { id_fazenda, nome_categoria, produto }: ProductTypeInput
    ) => {
      if(!id_fazenda || !nome_categoria || !produto) {
        throw new Error('Os campos não podem estar vazios');
      }

      const rows = await DatabaseCreate.createProduct({
        id_fazenda,
        nome_categoria,
        produto,
      });

      if (!rows || AnError(rows)) {
        const error = rows as ErrorObjectType;
        return error["error"];
      }

      return rows as ProdutoSchemaType;
    },
    sellProduct: async (
      _: any,
      { id_consumidor, id_produto }: SellProductInputType
    ) => {
      const rows = await DatabaseCreate.sellProduct({
        id_consumidor,
        id_produto,
      });

      if (!rows || AnError(rows)) {
        const error = rows as ErrorObjectType;
        return error["error"];
      }

      return rows as ProdutoSchemaType;
    },
    createEmployee: async (
      _: any,
      { id_consumidor, id_fazenda }: EmplyeeInputType
    ) => {
      const rows = await DatabaseCreate.createEmployee({
        id_fazenda,
        id_consumidor,
      });

      if (!rows || AnError(rows)) {
        const error = rows as ErrorObjectType;
        console.log(error);
        return error["error"];
      }
      
      if(!AnError(rows)) {
        return 202;
      }
    },
  },
};