import { fileURLToPath } from "node:url";
import { gql } from "graphql-tag";
import path from "node:path";
import { readFileSync } from "node:fs";
import { CostumerAndFarmType, CostumerAndProductType } from "../../../model/@types/type";
import DATESCALAR from "../helpers/DateScalar";
import { DatabaseConnectionPOST } from "../../../model/databaseConnection";
import MessageHeath from "../../../DTO/MessageHeath";
import type { Cart, CustomerInputType, CustomerSchemaType, LocalizacaoInputType, WishListType } from "./@types/CustomerInput";
import AnError from "../helpers/AnError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BCRYPT_SALT, JWT_SECRET } from "../../../utils/EnvConfigs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const typeDefs = gql(readFileSync(path.resolve(__dirname, 'schema.graphql'), { encoding: 'utf-8' }));

const database = new DatabaseConnectionPOST();
export const resolvers = {
  Date: DATESCALAR,
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
        localizacao: LocalizacaoInputType;
      }
    ) => {
      const that = structuredClone(consumidor);
      const salt = bcrypt.genSaltSync(BCRYPT_SALT);
      const hash = bcrypt.hashSync(that['senha'], salt);
      const transformed = {...that, senha: hash};
      const row = await database.createCostumer(transformed, localizacao);

      if (row && AnError(row)) {
        console.log(row);
        return null;
      }
      const payload = {
        email: that['email'],
      };
      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "30d",
      });

      const datas = row as unknown as CustomerSchemaType;
      datas["token"] = token;
      return datas;
    },
    addToWishList: async (
      _: any,
      { id_consumidor, id_produto }: CostumerAndProductType
    ) => {
      const wishList = await database.fromCustomerAddToWishList({
        id_consumidor,
        id_produto,
      });

      if (wishList && AnError(wishList)) {
        console.log(wishList);
        return null;
      }

      const datas = wishList as unknown as WishListType;
      return datas;
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
        console.log(cart);
        return null;
      }

      const datas = cart as unknown as Cart;
      return datas;
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
        console.log(favoriteFarm);
        return null;
      }

      return favoriteFarm;
    },
  },
};

