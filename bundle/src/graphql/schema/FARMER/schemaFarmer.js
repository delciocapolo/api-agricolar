import { readFileSync } from "node:fs";
import gql from "graphql-tag";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jwt from "jsonwebtoken";
import { DatabaseConnectionGET, DatabaseConnectionPOST } from "../../../model/databaseConnection";
import DATESCALAR from "../helpers/DateScalar";
import { JWT_SECRET } from "../../../utils/EnvConfigs";
import AnError from "../helpers/AnError";
import { CriptoPassword } from "../helpers/CriptoPassword";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const typeDefs = gql(readFileSync(path.resolve(__dirname, 'schema.graphql'), { encoding: 'utf-8' }));
const DatabaseGet = new DatabaseConnectionGET();
const DatabaseCreate = new DatabaseConnectionPOST();
export const resolvers = {
    Date: DATESCALAR,
    Query: {
        sold: async (_, { id_fazenda, id_monitoramento }) => {
            const row = await DatabaseGet.getSoldProduct(id_fazenda, id_monitoramento);
            if (!row || AnError(row)) {
                const error = row;
                return error['error'];
            }
            return row;
        },
        // resolvidos
        solds: async (_, { id_fazenda }) => {
            const rows = await DatabaseGet.fromFarmGetProductSolds(id_fazenda);
            if (!rows || AnError(rows)) {
                const error = rows;
                return error['error'];
            }
            return rows;
        },
        product: async (_, { id_fazenda, id_product }) => {
            const row = await DatabaseGet.fromFarmGetProduct(id_fazenda, id_product);
            if (!row || AnError(row)) {
                const error = row;
                return error['error'];
            }
            return row;
        },
        productsByFarm: async (_, { id_fazenda }) => {
            const rows = await DatabaseGet.fromFarmGetProducts(id_fazenda);
            if (!rows || AnError(rows)) {
                const error = rows;
                return error['error'];
            }
            return rows;
        },
        stock: async (_, { id_fazenda }) => {
            const rows = await DatabaseGet.fromFarmGetStock(id_fazenda);
            if (!rows || AnError(rows)) {
                const error = rows;
                return error["error"];
            }
            return rows;
        },
        productByCategory: async (_, { id_categoria }) => {
            const rows = await DatabaseGet.getProductByCategory(id_categoria);
            if (!rows || AnError(rows)) {
                const error = rows;
                return error["error"];
            }
            const transform = rows;
            return transform;
        },
        client: async (_, { id_client, id_fazenda }) => {
            const row = await DatabaseGet.fromFarmGetClient(id_fazenda, id_client);
            if (!row || AnError(row)) {
                const error = row;
                return error['error'];
            }
            const transform = row;
            return transform;
        },
        clients: async (_, { id_fazenda }) => {
            const rows = await DatabaseGet.fromFarmGetClients(id_fazenda);
            if (!rows || AnError(rows)) {
                const error = rows;
                return error["error"];
            }
            return rows;
        },
    },
    Mutation: {
        createFarmer: async (_, { fazendeiro, localizacao }) => {
            if (!fazendeiro || !localizacao) {
                throw new Error('Os campos não podem estar vazios!');
            }
            const transform = CriptoPassword(fazendeiro);
            const row = await DatabaseCreate.createFarmer({
                fazendeiro: transform,
                localizacao,
            });
            if (!row || AnError(row)) {
                const error = row;
                return error['error'];
            }
            const payload = {
                email: fazendeiro["email"],
            };
            const token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: "30d",
            });
            const datas = row;
            return { fazendeiro: datas, token };
        },
        createFarm: async (_, { id_fazendeiro, farm }) => {
            if (!id_fazendeiro || !farm) {
                throw new Error('Os campos não podem estar vazios!');
            }
            const rows = await DatabaseCreate.createFarm({ farm, id_fazendeiro });
            if (!rows || AnError(rows)) {
                const error = rows;
                return error["error"];
            }
            return rows;
        },
        createProduct: async (_, { id_fazenda, nome_categoria, produto }) => {
            if (!id_fazenda || !nome_categoria || !produto) {
                throw new Error('Os campos não podem estar vazios');
            }
            const rows = await DatabaseCreate.createProduct({
                id_fazenda,
                nome_categoria,
                produto,
            });
            if (!rows || AnError(rows)) {
                const error = rows;
                return error["error"];
            }
            return rows;
        },
        sellProduct: async (_, { id_consumidor, id_produto }) => {
            const rows = await DatabaseCreate.sellProduct({
                id_consumidor,
                id_produto,
            });
            if (!rows || AnError(rows)) {
                const error = rows;
                return error["error"];
            }
            return rows;
        },
        createEmployee: async (_, { id_consumidor, id_fazenda }) => {
            const rows = await DatabaseCreate.createEmployee({
                id_fazenda,
                id_consumidor,
            });
            if (!rows || AnError(rows)) {
                const error = rows;
                console.log(error);
                return error["error"];
            }
            if (!AnError(rows)) {
                return 202;
            }
        },
    },
};
//# sourceMappingURL=schemaFarmer.js.map