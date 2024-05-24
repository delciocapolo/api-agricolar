# Detalhes
1. Uma representacao grafica(mind), de como as rotas irão funcionar - [ [whimsical/agricolar-backend](https://whimsical.com/agricolar-backend-4UH6FTjHKyn9JASEhP7VRP) ]. Se preferir ver como as rotas estão listadas precisa ir ao arquivo [role.todo]

## Observações
1. Para compose dos subgrafos usando o rover CLI, localmente, use o comando:
<code>rover supergraph compose --config ./router/supergraph.yaml --output ./router/prod-schema.graphql</code>
O rover, precisar estar instalado e configurado. Isso pode ser feito, seguindo a doc: [Install Rover CLI](https://www.apollographql.com/docs/federation/quickstart/setup/#install-the-rover-cli).

## Rodar o super-graph.graphql
Para rodar o supergraph, use o comando: <code>cd ./router && ./router --supergraph=prod-schema.graphql && cd ..</code>
O bin(rover) deveria estar no directório raíz, mas isso iria complicar um pouco a organização! Por isso ele foi colocado aí! Ou rode o comando: <code>npm run graphql:compose</code>

## Gerar o build
Para gerar o build, podemos usar tanto o webpack quando o tsc! Para o webpack uma config já está preparada e pronta a usar.

# ATENÇÃO
Este repositório era o backend da plataforma [Agricolar](https://github.com/delciocapolo/agricolar). Actualmente o projecto foi descontinuado e concentra-se um novo, em repositório privado.
