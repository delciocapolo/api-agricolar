import { ApolloServer, BaseContext } from "@apollo/server";
import { ContextAPI } from "../schema/helpers/ContextType";

export type ErrorObjectType = {
  error: string;
  path: string | string[];
};

export type ApolloServerType =
  | ApolloServer<ContextAPI>
  | ApolloServer<BaseContext>
  | ApolloServer;
export type ArrayApolloServerType = Array<ApolloServerType>;

export type LocalizacaoType = {
  cidade: string;
  provincia: string;
};