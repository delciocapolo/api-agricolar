'strict';
import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import env from "env-var";
import fetch from "node-fetch";
const BI_NUMBER = env.get('BI_NUMBER').required().asString();
const urlBase = `https://digital.ao/ao/actions/bi.ajcall.php?bi=${BI_NUMBER}`;
// Teste de integracao
describe('Availability external services', () => {
    it('should [https://digital.ao/] api to be available, when test connection is make', async () => {
        const response = await fetch(urlBase, { method: 'HEAD' });
        strictEqual(response.ok, true, new Error('API is down'));
    });
    it('should return bi_datas, when completed', async () => {
        const response = await fetch(`http://localhost:5055/v1/bi/${BI_NUMBER}`, { method: 'GET' });
        strictEqual(response.status, 202);
    });
    it('should return all fields necessary', async () => {
        const response = await fetch(`http://localhost:5055/v1/bi/${BI_NUMBER}`, { method: 'GET' });
        const data = await response.json();
        const arrFields = ['nome', 'data_nasc', 'genero'];
        const fields = Object.keys(data).filter((key) => arrFields.includes(key));
        strictEqual(fields.length, 3, new Error('Um dos campos retornados pela consulta na API, esta em falta'));
    });
});
//# sourceMappingURL=UniqueIdentification_BI.test.js.map