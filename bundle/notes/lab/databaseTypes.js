import fs from 'node:fs';
import path from "node:path";
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const schemaPath = path.resolve(__dirname, '..', 'prisma', 'schema.prisma');
const stringSchemaPrisma = fs.readFileSync(schemaPath, {
    encoding: 'utf-8'
});
const modelos = stringSchemaPrisma.split('model ');
modelos.shift(); // Remove o primeiro item vazio
let temp = [];
const listNameModel = [];
for (const modelo of modelos) {
    const matchModelo = modelo.match(/(\w+)\s+{(.*)}/s);
    if (!matchModelo)
        continue; // Ignora se não houver correspondência
    const [, nomeModelo, corpoModelo] = matchModelo;
    const parametrosEtipos = {};
    if (!nomeModelo || !corpoModelo)
        continue;
    const regexParametros = /\s+(\w+)\s+(\w+)\s*(@.*)?/g;
    let matchParametro = null;
    while ((matchParametro = regexParametros.exec(corpoModelo)) !== null) {
        const [, nomeParametro, tipoDado] = matchParametro;
        if (tipoDado === 'String') {
            parametrosEtipos[nomeParametro] = 'string';
        }
        else if (tipoDado === 'Int' || tipoDado === 'Float' || tipoDado === 'Double') {
            parametrosEtipos[nomeParametro] = 'number';
        }
        else if (tipoDado === 'DateTime') {
            parametrosEtipos[nomeParametro] = 'Date';
        }
        else if (tipoDado === 'Boolean') {
            parametrosEtipos[nomeParametro] = 'boolean';
        }
        else {
            parametrosEtipos[nomeParametro] = tipoDado;
        }
    }
    const x = {
        [nomeModelo]: parametrosEtipos
    };
    listNameModel.push(nomeModelo);
    temp.push(x);
}
for (let index = 0; 
// valores do loop
index < temp.length; index++) {
    const objectModel = temp.at(index);
    const key = objectModel[listNameModel[index]];
    const y = Object.values(key);
    const w = Object.keys(key);
    for (const z of y) {
        if (z === 'number' || z === 'string' || z === 'Date' || z === 'Sexo')
            continue;
        const tmp = z;
        let x = '';
        console.log(w[0]);
        // if (
        //     w.at(index)?.startsWith(tmp.toLowerCase().slice(0, -1)) ||
        //     w.at(index)?.startsWith(tmp.toLowerCase().slice(0, 2)) &&
        //     !w.at(index)?.includes('id')
        // ) {
        //     // x = w.at(index)!;
        //     // console.log(temp[index])
        //     // console.log(objectModel[z as string])
        // }
        // temp = [...temp, {
        //     [listNameModel.at(index)!]: {
        //         ...key,
        //         [x]: objectModel
        //     }
        // }]
    }
}
// console.log(
//     temp.at(0)![listNameModel.at(0)!]
// )
// console.log(temp);
//# sourceMappingURL=databaseTypes.js.map