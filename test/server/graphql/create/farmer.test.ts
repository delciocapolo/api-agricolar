import { describe, it } from "node:test";
import { notStrictEqual } from "node:assert";
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
                    email: `user.text${new Date().getTime()}@mail.com`,
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
        const data = await response.body;
        const check = Object.values(data.data).every((v) => v === null);
        const msg = Object.keys(data).includes('errors');
        notStrictEqual(msg, true);
        notStrictEqual(check, true);
    });

    it('should return farm fields, when datas are submit', async (ctx) => {
        const queryData = {
            query: `mutation CreateFarm($idFazendeiro: String!, $farm: FazendaInput) {
                createFarm(id_fazendeiro: $idFazendeiro, farm: $farm) {
                    id_fazenda
                    nome_fazenda
                    createdAt
                    updatedAt
                    fazendeiro_id_fazendeiro
                }
              }`,
            variables: {
                "idFazendeiro": "clv89lwgn000axu9u6nkn2kyz",
                "farm": {
                    "nome_fazenda": `B Threen x${new Date().getTime()}`
                }
            }
        };

        const response = await request(baseUrl)
            .post('/')
            .send(queryData);

        const data = await response.body;
        const check = Object.values(data.data).every((v) => v === null);
        const msg = Object.keys(data).includes('errors');
        notStrictEqual(msg, true);
        notStrictEqual(check, true);
    });

    it('should return product fields, when features are submit', async () => {
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
                createdAt
                updatedAt
                }
              }`,
            variables: {
                "id_fazenda": "clv9fetqf00005pwaioxtc2lq",
                "nome_categoria": "Fruta",
                "produto": {
                    "nome_produto": `Banana XXY.x..${new Date().getTime()}`,
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
        const check = Object.values(data.data).every((v) => v === null);
        const msg = Object.keys(data).includes('errors');
        notStrictEqual(msg, true);
        notStrictEqual(check, true);
    });

    it('should return selling product when user buy it', async () => {
        const queryData = {
            query: `mutation SellProduct($id_consumidor: ID!, $id_produto: ID!){
                sellProduct(id_consumidor: $id_consumidor, id_produto: $id_produto) {
                    id_produto
                    nome_produto
                    preco_produto
                    categoria_id_categoria
                    caminho_foto_produto
                    descricao
                    servico_entrega_disponivel
                    disponivel
                    fazenda_id_fazenda
                    createdAt
                    updatedAt
                }
            }`,
            variables: {
                "id_consumidor": "882ujaj82ajjny383ujsjs",
                "id_produto": "clv9p7hyq0003svm0qcmxi3ue",
            }
        };

        const response = await request(baseUrl)
            .post('/')
            .send(queryData);
        const data = await response.body;
        const check = Object.values(data.data).every((v) => v === null);
        const msg = Object.keys(data).includes('errors');
        notStrictEqual(msg, true);
        notStrictEqual(check, true);
    });

    it('should return employee created when employee submit datas him/her', async () => {
        const queryData = {
            query: `mutation CreateEmployee($idFazenda: ID!, $idConsumidor: ID!) {
                createEmployee(id_fazenda: $idFazenda, id_consumidor: $idConsumidor) {
                  employee {
                    empregado_id_consumidor
                    entidade_id_fazenda
                    id_colaborador
                  }
                  empregado {
                    id_consumidor
                    nome_consumidor
                    email
                    numero_compras
                    numero_telefone
                    role
                    senha
                    sexo
                    caminho_foto_consumidor
                    data_nascimento
                  }
                  entidade {
                    id_fazenda
                    nome_fazenda
                    createdAt
                    updatedAt
                    fazendeiro_id_fazendeiro
                  }
                }
              }`,
            variables: {
                "idFazenda": "clv9rtne7000098i9dx0ah2po",
                "idConsumidor": "882ujaj82ajjny383ujsjs",
            }
        };

        const response = await request(baseUrl)
            .post('/')
            .send(queryData);
        const data = await response.body;
        const msg = Object.keys(data).includes('errors');
        const check = !msg && Object.values(data.data).every((v) => v === null);
        notStrictEqual(msg, true);
        notStrictEqual(check, true);
    });
})