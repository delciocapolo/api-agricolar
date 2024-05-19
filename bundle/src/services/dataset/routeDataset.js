import { Router } from "express";
const GetDatasetSales = Router();
GetDatasetSales.get('/v1/datasetsales', (req, res) => {
    // todo: pegar o dataset em csv
    // transformar em json
    // ler o arquivo como stream, pra nao causar um memory leak
    // transformar os dados para serem lidos no fronted
    // enviar os dados como stream, rsrs, novamente para nao causar um memory leak
});
export default GetDatasetSales;
//# sourceMappingURL=routeDataset.js.map