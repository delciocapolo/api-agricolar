import { ApolloServer } from "@apollo/server";
import * as schema from "./schema";

const serverGeneralEndpoint = new ApolloServer({
    ...schema,
    introspection: true
});

export default serverGeneralEndpoint;