import { ApolloServer } from "@apollo/server";
import * as schema from "./schema";

const serverGetFarmerRoute = new ApolloServer({
    ...schema
});

export default serverGetFarmerRoute;