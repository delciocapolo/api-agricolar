import { GraphQLScalarType, Kind } from "graphql";
const DATESCALAR = new GraphQLScalarType({
    name: "Date",
    description: "Formato Date, customizado para o GrapQL",
    serialize(value) {
        // Serializes an internal value to include in a response.
        // Serializa um valor interno(o que vem do [parseValue]) to incluir na resposta.
        // basicamente, o valor que eh retornado para o GraphQL
        if (value instanceof Date) {
            return value.getTime();
        }
        throw new Error('GraphQL Date Scalar parser experava um objecto "Date"');
    },
    parseValue(value) {
        // eh o PRIMEIRO PASS
        // Parses an externally provided value to use as an input.
        // converte um valor externo(informado pelo usuario)
        // para usar como uma entrada
        if (typeof value === "number") {
            return new Date(value);
        }
        throw new Error('GraphQL Date Scalar parser esperava um "numero"');
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            // convert hard-coded AST string para inteiro e entao para Date
            return new Date(parseInt(ast.value, 10));
        }
        // hard-coded, valor invalido (nao eh um inteiro)
        return null;
    },
});
export default DATESCALAR;
//# sourceMappingURL=DateScalar.js.map