// modules
import { fileURLToPath } from "node:url";
import { gql } from "graphql-tag";
import path from "node:path";
import { readFileSync } from "node:fs";
import jwt from "jsonwebtoken";

// Modulos exporteds
import AnError from "../helpers/AnError";
import DATESCALAR from "../helpers/DateScalar";
import MessageHeath from "../../../DTO/MessageHeath";
import { JWT_SECRET } from "../../../utils/EnvConfigs";
import { DatabaseConnectionPOST } from "../../../model/databaseConnection";
import { 
  CostumerAndFarmType, 
  CostumerAndProductType 
} from "../../../model/@types/type";
import type {
  CustomerInputType, 
  CustomerSchemaType, 
} from "./@types/CustomerTypes";
import { LocalizacaoType } from "../../@types/graphqlType";
import { CriptoPassword } from "../helpers/CriptoPassword";
import { ErrorObjectType } from "../../@types/graphqlType";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const typeDefs = gql(readFileSync(path.resolve(__dirname, 'schema.graphql'), { encoding: 'utf-8' }));

const database = new DatabaseConnectionPOST();
export const resolvers = {
  // Esclares
  Date: DATESCALAR,

  // Resolves
  ConsumidorTokenSchema: {
    __resolveType(arg: any) {
      if (arg.token) {
        return 'TokenSchema';
      }
      if (arg.id_consumidor) {
        return "ConsumidorSchema";
      }
      return null;
    }
  },

  // Querys padrao
  Query: {
    health: () => {
      return MessageHeath("POST Customer");
    },
  },
  Mutation: {
    createCostumer: async (
      _: any,
      {
        consumidor,
        localizacao,
      }: {
        consumidor: CustomerInputType;
        localizacao: LocalizacaoType;
      }
    ) => {
      if (!consumidor || !localizacao) {
        throw new Error("Os campos não podem estar vazios!");
      }
      
      const transform = CriptoPassword(consumidor) as CustomerInputType;
      const row = await database.createCustomer(transform, localizacao);

      if (!row || AnError(row)) {
        const errors = row as unknown as ErrorObjectType;
        console.log(errors);
        return errors["error"];
      }

      const payload = {
        email: consumidor["email"],
      };
      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "30d",
      });

      const datas = row as unknown as CustomerSchemaType;
      return {consumidor: datas, token};
    },
    
    addToWishList: async (
      _: any,
      { id_consumidor, id_produto }: CostumerAndProductType
    ) => {
      if (!id_consumidor || !id_produto) {
        console.error('Campos vazios');
        throw new Error('Os campos nao podem estar vazios');
      }

      const wishList = await database.fromCustomerAddToWishList({
        id_consumidor,
        id_produto,
      });

      if (wishList && AnError(wishList)) {
        console.log(wishList);
        return null;
      }

      return 202;
    },

    addToCart: async (
      _: any,
      { id_consumidor, id_produto }: CostumerAndProductType
    ) => {
      const cart = await database.addToCart({
        id_consumidor,
        id_produto,
      });

      if (cart && AnError(cart)) {
        const error = cart as ErrorObjectType;
        return error["error"];
      }

      // const datas = cart as unknown as Cart;
      return 202;
    },

    createFavoriteFarm: async (
      _: any,
      { id_consumidor, id_fazenda }: CostumerAndFarmType
    ) => {
      const favoriteFarm = await database.createFarvoriteFarm({
        id_consumidor,
        id_fazenda,
      });

      if (favoriteFarm && AnError(favoriteFarm)) {
        const error = favoriteFarm as ErrorObjectType;
        return error['error'];
      }

      return 202;
    },
  },
};

