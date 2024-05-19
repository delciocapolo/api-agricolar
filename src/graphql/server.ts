import {ApolloGateway, RemoteGraphQLDataSource} from "@apollo/gateway";

const Gateway = new ApolloGateway({
  serviceList: [
    { name: "farmer", url: "http://localhost:5051/v1/farmer" },
    { name: "customer", url: "http://localhost:5050/v1/customer" },
    { name: "set", url: "http://localhost:5052/v1/set" },
  ],
  introspectionHeaders: {
    Authorization: "Bearer abc123",
  },
  buildService({ url, name }) {
    return new (class extends RemoteGraphQLDataSource {
      fetcher = require("make-fetch-happen").defaults({
        onRetry() {
          console.log("We will retry!");
        },
      });
    })({ url, name });
  },
  fetcher: require("make-fetch-happen").defaults({
    onRetry() {
      console.log("We will retry!");
    },
  }),
});