import { ApolloServer, BaseContext } from "@apollo/server";
import { ContextAPI } from "../schema/helpers/ContextType";

export type ApolloServerType =
  | ApolloServer<ContextAPI>
  | ApolloServer<BaseContext>
  | ApolloServer;
export type ArrayApolloServerType = Array<ApolloServerType>;
