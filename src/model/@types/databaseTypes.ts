import { format } from '@prisma/internals';
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

const temp: SchemaModel[] = []

for (const modelo of modelos) {
    const matchModelo = modelo.match(/(\w+)\s+{(.*)}/s);
    if (!matchModelo) continue; // Ignora se não houver correspondência

    const [, nomeModelo, corpoModelo] = matchModelo;
    const parametrosEtipos: ParametrosTipos = {};

    if (!nomeModelo || !corpoModelo) continue;

    const regexParametros = /\s+(\w+)\s+(\w+)\s*(@.*)?/g;
    let matchParametro;
    while ((matchParametro = regexParametros.exec(corpoModelo)) !== null) {
        const [, nomeParametro, tipoDado] = matchParametro;
        if (tipoDado === 'String') {
            parametrosEtipos[nomeParametro as string] = String;
        } else if (tipoDado === 'Int') {
            parametrosEtipos[nomeParametro as string] = Number;
        } else if (tipoDado === 'DateTime') {
            parametrosEtipos[nomeParametro as string] = Date;
        } else {
            parametrosEtipos[nomeParametro as string] = tipoDado;
        }
        // Se não houver tipo de dado, atribui uma string vazia
    }
    temp.push({
        [nomeModelo]: parametrosEtipos
    })
}

console.log(temp);