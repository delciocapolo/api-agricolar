import { describe, it } from "node:test";
import { notStrictEqual, strictEqual } from "node:assert";
import request from "supertest";
import { debug } from "node:util";
const log = debug('test');
const baseUrl = 'http://localhost:5055/v1/farmer/create';
const random = () => Math.round(Math.random() * 15 + 10);
describe('Creating Datas to the Farmer Server', () => {
    it("should return done's value, when we submit in the route", async () => {
        const queryData = {
            query: `query Query {
                done
            }`,
        };
        const response = await request(baseUrl)
            .post('/')
            .send(queryData);
        const data = await response.body;
        notStrictEqual(data.data, null);
    });
    it('should return farmer fields, when we submit datas', async () => {
        const queryData = {
            query: `mutation Farmer($fazendeiro: FazendeiroInput, $localizacao: LocalizacaoInput) {
                createFarmer(fazendeiro: $fazendeiro, localizacao: $localizacao) {
                    id_fazendeiro
                    nome_fazendeiro
                    email
                    quantidade_fazendas
                    sexo
                    data_nascimento
                    role
                }
            }`,
            variables: {
                fazendeiro: {
                    nome_fazendeiro: "User Test",
                    email: `user.text${random()}@mail.com`,
                    sexo: "M",
                    data_nascimento: "2012-10-30",
                    senha: "only_test",
                },
                localizacao: {
                    cidade: "Capolo 1",
                    provincia: "Luanda"
                }
            }
        };
        const response = await request(baseUrl)
            .post('/')
            .send(queryData);
        const temp = Object.keys(response.body).includes('errors');
        notStrictEqual(temp, true);
        // so para ter certeza sobre a validacao dos erros
        strictEqual(response.error, false);
    });
    it('should return farm fields, when datas are submit', async (ctx) => {
        const queryData = {
            query: `mutation CreateFarm($idFazendeiro: String!, $farm: FazendaInput) {
                createFarm(id_fazendeiro: $idFazendeiro, farm: $farm) {
                    id_fazenda
                    nome_fazenda
                    createAt
                    updatedAt
                    fazendeiro_id_fazendeiro
                }
              }`,
            variables: {
                "idFazendeiro": "clv89lwgn000axu9u6nkn2kyz",
                "farm": {
                    "nome_fazenda": `B Threen x${random()}`
                }
            }
        };
        const response = await request(baseUrl)
            .post('/')
            .send(queryData);
        const data = await response.body;
        notStrictEqual(data.data, null);
    });
    it('should it return product fields, when features are submit', async () => {
        const queryData = {
            query: `mutation Product($id_fazenda: String!, $nome_categoria: String!, $produto: ProductInput) {
                createProduct(id_fazenda: $id_fazenda, nome_categoria: $nome_categoria, produto: $produto
              ) {
                id_produto
                nome_produto
                preco_produto
                categoria_id_categoria
                caminho_foto_produto
                descricao
                servico_entrega_disponivel
                disponivel
                fazenda_id_fazenda
                createAt
                updatedAt
                }
              }`,
            variables: {
                "id_fazenda": "clv9fetqf00005pwaioxtc2lq",
                "nome_categoria": "Fruta",
                "produto": {
                    "nome_produto": `Banana XXY.x..${random()}`,
                    "caminho_foto_produto": "./path/product",
                    "descricao": "to eat, fuck",
                    "preco_produto": 245.90,
                    "servico_entrega_disponivel": true
                }
            }
        };
        const response = await request(baseUrl)
            .post('/')
            .send(queryData);
        const data = await response.body;
        notStrictEqual(data.data, null);
    });
});
//# sourceMappingURL=farmer.test.js.map