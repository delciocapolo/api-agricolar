import fs from 'node:fs';
import path from "node:path";
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const schemaPath = path.resolve(__dirname, '..', '..', '..', 'prisma', 'schema.prisma')
const stringSchemaPrisma = fs.readFileSync(schemaPath, {
    encoding: 'utf-8'
}) satisfies string;

const modelos = stringSchemaPrisma.split('model ');
modelos.shift(); // Remove o primeiro item vazio

interface ParametrosTipos {
    [key: string]: unknown;
}

interface SchemaModel {
    [modelName: string]: ParametrosTipos
}

let temp: SchemaModel[] = []
const listNameModel = [];

for (const modelo of modelos) {
    const matchModelo = modelo.match(/(\w+)\s+{(.*)}/s);
    if (!matchModelo) continue; // Ignora se não houver correspondência

    const [, nomeModelo, corpoModelo] = matchModelo;
    const parametrosEtipos: ParametrosTipos = {};

    if (!nomeModelo || !corpoModelo) continue;

    const regexParametros = /\s+(\w+)\s+(\w+)\s*(@.*)?/g;
    let matchParametro = null;

    while ((matchParametro = regexParametros.exec(corpoModelo)) !== null) {
        const [, nomeParametro, tipoDado] = matchParametro;
        if (tipoDado === 'String') {
            parametrosEtipos[nomeParametro as string] = 'string';
        } else if (tipoDado === 'Int' || tipoDado === 'Float' || tipoDado === 'Double') {
            parametrosEtipos[nomeParametro as string] = 'number' as unknown as number;
        } else if (tipoDado === 'DateTime') {
            parametrosEtipos[nomeParametro as string] = 'Date' as unknown as Date;
        } else if (tipoDado === 'Boolean') {
            parametrosEtipos[nomeParametro as string] = 'boolean' as unknown as boolean;
        } else {
            parametrosEtipos[nomeParametro as string] = tipoDado;
        }
    }

    const x = {
        [nomeModelo]: parametrosEtipos
    }

    listNameModel.push(nomeModelo);
    temp.push(x);
}

for (
    let index = 0;
    // valores do loop
    index < temp.length;
    index++) {

    const objectModel: SchemaModel = temp.at(index)!;
    const key: ParametrosTipos = objectModel[listNameModel[index]!]!;

    const y = Object.values(key);
    const w = Object.keys(key);

    for (const z of y) {
        if (z === 'number' || z === 'string' || z === 'Date' || z === 'Sexo') continue;

        const tmp = z as string;
        let x: string = '';

        console.log(w[0])
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
