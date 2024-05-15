'strict'
import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import env from "env-var";

// ping 188.165.138.196
const BI_NUMBER = env.get('BI_NUMBER').required().asString();
const urlBase = `https://digital.ao/ao/actions/bi.ajcall.php?bi=${BI_NUMBER}`;

// Teste de integracao
describe('Availability external services', () => {
    it('should [https://digital.ao/] api to be available, when test connection is made', async (ctx) => {
        const response = await fetch(urlBase, { method: 'HEAD', signal: ctx.signal });
        strictEqual(response.ok, true, new Error('API is down'));
    });

    it('should return bi_datas, when completed', async (ctx) => {
        const response = await fetch(`http://localhost:5055/v1/bi/${BI_NUMBER}`, { method: 'GET', signal: ctx.signal });
        strictEqual(response.status, 202);
    });

    it('should return all fields necessary', async (ctx) => {
        const response = await fetch(`http://localhost:5055/v1/bi/${BI_NUMBER}`, { method: 'GET', signal: ctx.signal });
        const data = await response.json() as object;
        const arrFields = ['nome', 'data_nasc', 'genero'];
        const fields = Object.keys(data).filter((key) => arrFields.includes(key));
        strictEqual(fields.length, 3, new Error('Um dos campos retornados pela consulta na API, esta em falta'));
    });
});