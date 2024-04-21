import { describe, it } from "node:test";
import { notStrictEqual } from "node:assert";
import request from "supertest";
describe('Creating Datas to the Farmer Server', () => {
    it("should return done's value, when we submit in the route", async () => {
        const queryData = {
            query: `query Query {
                done
            }`,
        };
        const response = await request('http://localhost:5055/v1/farmer/create').post('/').send(queryData);
        notStrictEqual(response, undefined);
    });
    it('should return farmer fields, when we submit datas', async () => {
        const queryData = {
            query: `mutation Farmer($fazendeiro: FazendeiroInput, $localizacao: LocalizacaoInput) {
                createFarmer(fazendeiro: $fazendeiro, localizacao: $localizacao) {
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
                    email: `user.text${Math.round(Math.random() * 15 + 10)}@mail.com`,
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
        const response = await request('http://localhost:5055/v1/farmer/create')
            .post('/')
            .send(queryData);
        const temp = Object.keys(response.body).includes('errors');
        notStrictEqual(temp, true);
    });
});
//# sourceMappingURL=farmer.test.js.map