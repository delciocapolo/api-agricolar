(() => {
    "use strict";
    var e, r, a, o, t = { 772: (e, r, a) => { a.d(r, { $: () => o }); const o = []; }, 344: (e, r, a) => { a.d(r, { A: () => y }); var o = a(299), t = a(24), n = a(684), i = a.n(n), s = a(760), c = a.n(s), d = a(136), l = a(782), m = a(476); const u = c().dirname((0, d.fileURLToPath)("file:///Users/delciocapolo/Documents/vscode/api-agricolar/src/graphql/schema/GET/farmer/schemaGetFarmer.ts")), p = i()((0, t.readFileSync)(c().resolve(u, "schema.graphql"), { encoding: "utf-8" })), f = new l.Q, h = { Date: m.A, Query: { sold: async (e, { id_fazenda: r, id_monitoramento: a }) => { const o = await f.getSoldProduct(r, a); if (o) {
                    if (!Object.keys(o).includes("message"))
                        return o;
                    console.error(o);
                }
                else
                    console.error("ERROR TO FETCH THE MONITORING PRODUCT"); }, solds: async (e, { id_fazenda: r }) => { const a = await f.fromFarmGetProductSolds(r); if (a && !Object.keys(a).includes("message"))
                    return a; console.error(a); }, product: async (e, { id_fazenda: r, id_product: a }) => { const o = await f.getProduct(r, a); if (!o || !Object.keys(o).includes("message"))
                    return o; console.error(o); }, products: async (e, { id_fazenda: r }) => { const a = await f.fromFarmGetProducts(r); if (a) {
                    if (!Object.keys(a).includes("message"))
                        return a;
                    console.error(a);
                }
                else
                    console.error("ERROR TO FETCH THE PRODUCTS FROM FARM"); }, stock: async (e, { id_fazenda: r }) => { const a = await f.getStock(r); if (a) {
                    if (!Object.keys(a).includes("message"))
                        return a;
                    console.error(a);
                }
                else
                    console.error("ERROR TO FETCH THE STOCK FROM FARM"); }, productByCategory: async (e, { id_categoria: r }) => { const a = await f.getProductByCategory(r); if (!a)
                    return console.error("ERROR TO GET PRODUCTS BY CATEGORY" + r), []; if (Object.keys(a).includes("message")) {
                    const e = a;
                    return console.log(e), [];
                } return a; }, client: async (e, { id_client: r, id_fazenda: a }) => { const o = await f.fromFarmGetClient(a, r); if (o && !Object.keys(o).includes("message"))
                    return o; console.error(o); }, clients: async (e, { id_fazenda: r }) => { const a = await f.fromFarmGetClients(r); if (a) {
                    if (!a || !Object.keys(a).includes("message"))
                        return a;
                    console.error(a);
                }
                else
                    console.error("ERROR TRYING GET CLIENTS FROM FARM" + r); } } }; var _ = a(530); const y = new o.ApolloServer({ schema: (0, _.buildSubgraphSchema)({ resolvers: h, typeDefs: p }), introspection: !0 }); }, 740: (e, r, a) => { a.d(r, { A: () => R }); var o = a(299), t = a(136), n = a(760), i = a.n(n), s = a(684), c = a.n(s), d = a(24), l = a(476), m = a(782); const u = (0, a(975).debug)("set:rote"), p = i().dirname((0, t.fileURLToPath)("file:///Users/delciocapolo/Documents/vscode/api-agricolar/src/graphql/schema/GET/set/schemaGetSet.ts")), f = (0, d.readFileSync)(i().resolve(p, "schema.graphql"), { encoding: "utf-8" }), h = new m.Q, _ = c()(f), y = { Date: l.A, Query: { costumers: async () => { const e = await h.getCostumers(); if (e) {
                    if (!Object.keys(e).includes("message"))
                        return e;
                    console.error(e);
                }
                else
                    u("ROW IS [UNDEFINED], AN ERROR OCCOURS TRYING GET COSTUMERS"); }, farmers: async () => { const e = await h.getFarmers(); if (e) {
                    if (!Object.keys(e).includes("message"))
                        return e;
                    console.error(e);
                }
                else
                    u("ROW IS [UNDEFINED], AN ERROR OCCOURS TRYING GET FARMERS"); }, products: async () => { const e = await h.getProducts(); if (e) {
                    if (!Object.keys(e).includes("message"))
                        return e;
                    console.error(e);
                }
                else
                    u("ROW IS [UNDEFINED], AN ERROR OCCOURS TRYING GET PRODUCTS"); }, user: async (e, { email: r }) => await h.fromDatabaseGetUser(r) } }; var E = a(530); const R = new o.ApolloServer({ schema: (0, E.buildSubgraphSchema)({ resolvers: y, typeDefs: _ }), introspection: !0 }); }, 905: (e, r, a) => { a.d(r, { A: () => _ }); var o = a(299), t = a(136), n = a(684), i = a(760), s = a.n(i), c = a(24), d = a(476), l = a(782); const m = s().dirname((0, t.fileURLToPath)("file:///Users/delciocapolo/Documents/vscode/api-agricolar/src/graphql/schema/POST/costumer/schemaPostCostumer.ts")), u = (0, n.gql)((0, c.readFileSync)(s().resolve(m, "schema.graphql"), { encoding: "utf-8" })), p = new l.k, f = { Date: d.A, Query: { done: () => "Done" }, Mutation: { createCostumer: async (e, { consumidor: r, localizacao: a }) => await p.createCostumer(r, a), createWishList: async (e, { id_consumidor: r, id_produto: a }) => await p.createWishList({ id_consumidor: r, id_produto: a }), createCart: async (e, { id_consumidor: r, id_produto: a }) => await p.addToCart({ id_consumidor: r, id_produto: a }), createFavoriteFarm: async (e, { id_consumidor: r, id_fazenda: a }) => await p.createFarvoriteFarm({ id_consumidor: r, id_fazenda: a }) } }; var h = a(530); const _ = new o.ApolloServer({ schema: (0, h.buildSubgraphSchema)({ resolvers: f, typeDefs: u }), introspection: !0 }); }, 158: (e, r, a) => { a.d(r, { A: () => R }); var o = a(299), t = a(760), n = a.n(t), i = a(24), s = a(684), c = a(136); const d = require("bcrypt"); var l = a.n(d), m = a(476), u = a(782), p = a(985); const f = n().dirname((0, c.fileURLToPath)("file:///Users/delciocapolo/Documents/vscode/api-agricolar/src/graphql/schema/POST/farmer/schemaPostFarmer.ts")), h = (0, s.gql)((0, i.readFileSync)(n().resolve(f, "schema.graphql"), { encoding: "utf-8" })), _ = new u.k, y = { Date: m.A, Query: { done: () => "Create user route defined!" }, Mutation: { createFarmer: async (e, { fazendeiro: r, localizacao: a }, o) => { o.token; const t = { ...r }, n = l().genSaltSync(p.kf), i = l().hashSync(t.senha, n), s = { ...t, senha: i }; return await _.createFarmer({ fazendeiro: s, localizacao: a }) || (console.error("An Error, trying create [Farmer]"), null); }, createFarm: async (e, { id_fazendeiro: r, farm: a }, o) => { try {
                    if (!a || "object" != typeof a)
                        throw new Error('Objeto "fazenda" não foi fornecido corretamente.');
                    o.token;
                    const e = await _.createFarm({ farm: a, id_fazendeiro: r });
                    return e ? Object.keys(e).includes("message") ? void console.error(e) : e : void console.error("RECORD WAS NOT INSERTED IN DATABASE");
                }
                catch (e) {
                    console.error("AN ERROR OCCOURS, TRYING CREATE FARM: "), console.error(e);
                } }, createProduct: async (e, { id_fazenda: r, nome_categoria: a, produto: o }) => { const t = await _.createProduct({ id_fazenda: r, nome_categoria: a, produto: o }); if (t) {
                    if (!Object.keys(t).includes("message"))
                        return t;
                    console.log(t);
                }
                else
                    console.error("An Error, trying create [Product]"); }, sellProduct: async (e, { id_consumidor: r, id_produto: a }) => { const o = await _.sellProduct({ id_consumidor: r, id_produto: a }); if (o) {
                    if (!Object.keys(o).includes("message"))
                        return o;
                    console.error(o);
                }
                else
                    console.error("An Error, trying create [Sell Product]"); }, createEmployee: async (e, { id_consumidor: r, id_fazenda: a }) => { const o = await _.createEmployee({ id_fazenda: a, id_consumidor: r }); if (o) {
                    if (!Object.keys(o).includes("message"))
                        return o;
                    console.error(o);
                }
                else
                    console.error("An Error, trying create [Create Employee]"); } } }; var E = a(530); const R = new o.ApolloServer({ schema: (0, E.buildSubgraphSchema)({ typeDefs: h, resolvers: y }), introspection: !0 }); }, 476: (e, r, a) => { a.d(r, { A: () => t }); const o = require("graphql"), t = new o.GraphQLScalarType({ name: "Date", description: "Formato Date, customizado para o GrapQL", serialize(e) { if (e instanceof Date)
                return e.getTime(); throw new Error('GraphQL Date Scalar parser experava um objecto "Date"'); }, parseValue(e) { if ("number" == typeof e)
                return new Date(e); throw new Error('GraphQL Date Scalar parser esperava um "numero"'); }, parseLiteral: e => e.kind === o.Kind.INT ? new Date(parseInt(e.value, 10)) : null }); }, 156: (e, r, a) => { a.a(e, (async (e, r) => { try {
            var o = a(985), t = a(975), n = a(772), i = a(68), s = e([i]);
            i = (s.then ? (await s)() : s)[0], (0, t.debuglog)("main"), (async () => { await new Promise((e => i.M.listen({ port: o.I }, e))), n.$.push({ server: "HTTP", status: "running", name: "HTTP 📬", adress: `http://localhost:${o.I}/v1/` }), console.table(n.$); })(), r();
        }
        catch (e) {
            r(e);
        } })); }, 782: (e, r, a) => { a.d(r, { Q: () => i, k: () => n }); const o = require("@prisma/client"), t = (0, require("util").debuglog)("database"); class n {
            prisma;
            constructor() { this.prisma = new o.PrismaClient, this.prisma.$connect().then((e => { t(`Conexão com Banco de Dados [${n.name}] estabelecida com sucesso`); })); }
            async createCostumer(e, r) { try {
                if (Array.isArray(e))
                    return await this.prisma.consumidor.createMany({ data: e });
                if (null !== await this.prisma.consumidor.findUnique({ where: { email: e.email } })) {
                    const e = { message: "Costumer already exists" };
                    return console.error(e), { ...e };
                }
                return await this.prisma.consumidor.create({ data: { nome_consumidor: e.nome_consumidor, email: e.email, numero_telefone: e.numero_telefone, senha: e.senha, sexo: e.sexo, caminho_foto_consumidor: e.caminho_foto_consumidor, data_nascimento: e.data_nascimento, localizacao: { create: { cidade: r.cidade, provincia: r.provincia } } }, include: { localizacao: !0 } });
            }
            catch (e) {
                console.error("CREATE COSTUMER, [ERROR]: "), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async createWishList({ id_consumidor: e, id_produto: r }) { try {
                return await this.prisma.produtoFavorito.create({ data: { consumidor_id_consumidor: e, produto_id_produto: r } });
            }
            catch (e) {
                console.error("CREATE WISH LIST, [ERROR]: "), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async addToCart({ id_consumidor: e, id_produto: r }) { try {
                return await this.prisma.carrinho.create({ data: { consumidor_id_consumidor: e, produto_id_produto: r } });
            }
            catch (e) {
                console.error("ADD TO CART, [ERROR]: "), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async createFarvoriteFarm({ id_consumidor: e, id_fazenda: r }) { try {
                return await this.prisma.fazendaFavorita.create({ data: { consumidor_id_consumidor: e, fazenda_id_fazenda: r } });
            }
            catch (e) {
                console.error("CREATE FAVORITE FARM, [ERROR]: "), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async createFarmer({ fazendeiro: e, localizacao: r }) { try {
                return Array.isArray(e) ? await this.prisma.fazendeiro.createMany({ data: e }) : null !== await this.prisma.fazendeiro.findUnique({ where: { email: e.email } }) ? { message: "O FAZENDEIRO JA EXISTE", path: "createFarmer method's class" } : await this.prisma.fazendeiro.create({ data: { nome_fazendeiro: e.nome_fazendeiro, email: e.email, senha: e.senha, data_nascimento: new Date(e.data_nascimento), sexo: e.sexo, caminho_foto_fazendeiro: e.caminho_foto_fazendeiro, localizacao: { create: { cidade: r.cidade, provincia: r.provincia } } } });
            }
            catch (e) {
                console.error("CREATE FARMER, [ERROR]: "), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async createFarm({ id_fazendeiro: e, farm: r }) { try {
                const a = await this.prisma.fazendeiro.findUnique({ where: { id_fazendeiro: e } }), o = await this.prisma.fazenda.findUnique({ where: { nome_fazenda: r.nome_fazenda } });
                return null === a ? { message: "O FAZENDEIRO NAO EXISTE", path: "createFarm method's class" } : null !== o ? { message: `A ${r.nome_fazenda} FAZENDA JA EXISTE`, path: "createFarm method's class" } : await this.prisma.fazenda.create({ data: { nome_fazenda: r.nome_fazenda, fazendeiro: { connect: { id_fazendeiro: e } } } });
            }
            catch (e) {
                console.error("CREATE FARM, [ERROR]: "), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async createProduct({ id_fazenda: e, nome_categoria: r, produto: a }) { try {
                return null === await this.prisma.fazenda.findUnique({ where: { id_fazenda: e } }) ? { message: "A FAZENDA NAO EXISTE", path: ["createProduct", "DatabaseConnection"] } : await this.prisma.produto.create({ data: { nome_produto: a.nome_produto, preco_produto: a.preco_produto, caminho_foto_produto: a.caminho_foto_produto, descricao: a.descricao, servico_entrega_disponivel: a.servico_entrega_disponivel, categoria: { connectOrCreate: { where: { nome_categoria: r }, create: { nome_categoria: r } } }, fazenda: { connect: { id_fazenda: e } } } });
            }
            catch (e) {
                console.error("CREATE PRODUCT, [ERROR]: "), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async sellProduct({ id_consumidor: e, id_produto: r }) { try {
                const a = await this.prisma.consumidor.findUnique({ where: { id_consumidor: e } });
                if (null === await this.prisma.produto.findUnique({ where: { id_produto: r } }) || null === a)
                    return { message: `O ${null === a ? "CONSUMIDOR" : "PRODUTO"} NAO EXISTE`, path: ["sellProduct", "DatabaseConnectionPOST"] };
                const o = await this.prisma.produto.update({ where: { id_produto: r }, data: { disponivel: !1 } });
                return await this.prisma.monitoramento.create({ data: { consumidor_id_consumirdor: e, produto_id_produto: o.id_produto, fazenda_id_fazenda: o.fazenda_id_fazenda } }), o;
            }
            catch (e) {
                console.error("SELL PRODUCT ERROR, [ERROR]: "), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async createEmployee({ id_fazenda: e, id_consumidor: r, privilegio: a }) { try {
                const a = await this.prisma.fazenda.findUnique({ where: { id_fazenda: e } }), o = await this.prisma.consumidor.findUnique({ where: { id_consumidor: r } });
                return null === a || null === o ? { message: `O/A ${null === a ? "Fazenda" : "Consumidor"} NAO EXISTE`, path: ["createEmployee", "DatabaseConnectionPOST"] } : (await this.prisma.consumidor.update({ where: { id_consumidor: r }, data: { role: "Employee" } }), await this.prisma.colaborador.create({ data: { empregado: { connect: { id_consumidor: r } }, entidade: { connect: { id_fazenda: e } } }, include: { empregado: !0, entidade: !0 } }));
            }
            catch (e) {
                console.error("CREATE EMPLOYEE, [ERROR]: "), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async createClient({ id_consumidor: e, id_fazenda: r }) { try {
                const a = await this.prisma.fazenda.findUnique({ where: { id_fazenda: r } }), o = await this.prisma.consumidor.findUnique({ where: { id_consumidor: e } });
                return null === o || null === a ? void (null === o ? console.error("This [User] doesn't exists") : console.error("This [Farm] doesn't exists")) : await this.prisma.clienteDaFazenda.create({ data: { consumidor: { connect: { id_consumidor: e } }, fazenda: { connect: { id_fazenda: r } } } });
            }
            catch (e) {
                console.error("An Error Ocurred when i tried create Clients from the Farm " + r), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
        } class i {
            prisma;
            constructor() { this.prisma = new o.PrismaClient, this.prisma.$connect().then((e => { t(`Conexão com Banco de Dados [${i.name}] estabelecida com sucesso`); })); }
            async getCostumers(e) { try {
                if (e)
                    return await this.prisma.consumidor.findMany({ take: e });
                const r = await this.prisma.consumidor.findMany();
                return r && 0 !== r.length ? r : { message: "THERE ARE NOT COSTUMERS", path: ["getCostumers", "DatabaseConnectionGET"] };
            }
            catch (e) {
                console.error("ERROR TO GET USERS"), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async getFarmers(e) { try {
                if (e)
                    return await this.prisma.fazendeiro.findMany({ take: e });
                const r = await this.prisma.fazendeiro.findMany();
                return r && 0 !== r.length ? r : { message: "THERE ARE NOT FARMERS", path: ["getFarmers", "DatabaseConnectionGET"] };
            }
            catch (e) {
                console.error("ERROR TO GET FARMER"), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async getProducts(e) { try {
                return e ? await this.prisma.produto.findMany({ take: e }) : await this.prisma.produto.findMany();
            }
            catch (e) {
                console.error("ERROR TO GET PRODUCT"), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async getSoldProducts(e, r) { const a = { id_monitoramento: !0, consumidor: { select: { nome_consumidor: !0, email: !0, numero_compras: !0, sexo: !0, numero_telefone: !0, localizacao: { select: { cidade: !0, provincia: !0 } }, compras: { where: { fazenda_id_fazenda: e }, select: { produto: { select: { nome_produto: !0, preco_produto: !0, descricao: !0, caminho_foto_produto: !0 } } } } } } }; try {
                return null === await this.prisma.fazenda.findUnique({ where: { id_fazenda: e } }) ? { message: "ESTA FAZENDA NAO EXISTE", path: ["getSoldProducts", "DatabaseConnectionGET"] } : r ? await this.prisma.monitoramento.findMany({ where: { fazenda_id_fazenda: e }, select: a, take: r }) : await this.prisma.monitoramento.findMany({ where: { fazenda_id_fazenda: e }, select: a });
            }
            catch (e) {
                console.error("AN ERROR OCCROURS TRYING GET ALL SOLD PRODUCTS!"), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async getSoldProduct(e, r, a) { const o = { id_monitoramento: !0, consumidor: { select: { nome_consumidor: !0, email: !0, numero_compras: !0, sexo: !0, numero_telefone: !0, localizacao: { select: { cidade: !0, provincia: !0 } }, compras: { where: { fazenda_id_fazenda: e }, select: { produto: { select: { nome_produto: !0, preco_produto: !0, descricao: !0, caminho_foto_produto: !0 } } } } } } }; try {
                if (null === await this.prisma.fazenda.findUnique({ where: { id_fazenda: e } }))
                    return { message: "ESTA FAZENDA NAO EXISTE", path: ["getSoldProducts", "DatabaseConnectionGET"] };
                if (a)
                    return await this.prisma.monitoramento.findMany({ where: { id_monitoramento: r }, select: o, take: a });
                const t = await this.prisma.monitoramento.findUnique({ where: { id_monitoramento: r }, select: { ...o } });
                return null === t ? { message: "O PRODUTO VENDIDO, NAO ESTA NA LISTA", path: ["getSoldProduct", "DatabaseConnectionGET"] } : t;
            }
            catch (e) {
                console.error("ERROR TO GET SOLD PRODUCTS"), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async getProduct(e, r) { try {
                const a = await this.prisma.fazenda.findUnique({ where: { id_fazenda: e }, include: { produto: !0 } });
                if (null === a)
                    return { message: "A FAZENDA NAO EXISTE", path: ["getProduct", "DatabaseConnectionGET"] };
                const o = a.produto.find((e => e.id_produto === r));
                return o || { message: "O PRODUTO NAO ESTA NA SUA LISTA DE ITEMS", path: ["getProduct", "DatabaseConnectionGET"] };
            }
            catch (e) {
                console.error("ERROR TO GET PRODUCT"), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async fromFarmGetProducts(e) { try {
                const r = await this.prisma.fazenda.findMany({ where: { id_fazenda: e }, include: { produto: !0 } });
                return r && null !== r ? r.map((({ produto: e }) => e))[0] : { message: "THERE ARE NOT PRODUCTS IN THIS FARM", path: ["fromFarmGetProducts", "DatabaseConnectionGET"] };
            }
            catch (r) {
                console.error("Can't Get Products from farm " + e), console.error();
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async farmExists(e) { try {
                const r = await this.prisma.fazenda.findUnique({ where: { id_fazenda: e } });
                let a = { message: "", path: ["farmExists", "DatabaseConnection"] };
                return null === r ? { ...a, message: "THIS FARM DOESNOT EXISTS" } : r || { ...a, message: "AN ERROR OCCOURS TRYING GET FARM" };
            }
            catch (r) {
                console.error("An Error Ocurred when i tried get Products from the Farm " + e), console.error(r);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async fromFarmGetProductSolds(e) { try {
                const r = await this.farmExists(e);
                if (!r)
                    return { message: "AN ERROR OCCOURS TRYING GET PRODUCT SOLD, FROM THE FARM", path: ["fromFarmGetProductSolds", "DatabaseConnectionGET"] };
                if (Object.keys(r).includes("message")) {
                    const e = Object(r);
                    return { message: e.message, path: ["fromFarmGetProductSolds", ...e.path] };
                }
                return (await this.prisma.monitoramento.findMany({ where: { fazenda_id_fazenda: e }, include: { produto: !0 } })).map((e => e.produto));
            }
            catch (r) {
                console.error("An Error Ocurred when i tried get Products from the Farm " + e), console.error(r);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async getStock(e, r = !1) { try {
                const r = await this.farmExists(e);
                return !r || Object.keys(r).includes("message") ? void console.error(r) : await this.prisma.stock.findMany({ where: { fazenda_id_fazenda: e } });
            }
            catch (r) {
                console.error("An Error Ocurred when i tried get Stock from the Farm " + e), console.error(r);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async getCategory(e) { try {
                const r = await this.prisma.categoria.findUnique({ where: { id_categoria: e } });
                return null === r ? { message: "ESTA CATEGORIA NAO EXISTE", path: ["getCategory", "DatabaseConnectionGET"] } : r;
            }
            catch (r) {
                console.error("AN ERROR OCCOUR TRYNG GET CATEGORY, BY ID" + e), console.error(r);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async getCategories(e) { try {
                return e ? await this.prisma.categoria.findMany({ take: e }) : await this.prisma.categoria.findMany();
            }
            catch (e) {
                console.error("An Error Ocurred when i tried get Categories"), console.error(e);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async fromFarmGetClients(e) { try {
                const r = await this.farmExists(e);
                if (!r)
                    return void console.error("AN ERROR OCCOURS TRYING GET CLIENTS FROM THIS FARM!");
                if (Object.keys(r).includes("message"))
                    return void console.error(r);
                return (await this.prisma.fazenda.findMany({ where: { id_fazenda: e }, include: { cliente: { select: { id_client: !0, consumidor: { select: { id_consumidor: !0, nome_consumidor: !0, email: !0, numero_telefone: !0, sexo: !0, data_nascimento: !0, createdAt: !0, caminho_foto_consumidor: !0, localizacao: { select: { cidade: !0, provincia: !0 } } } } } } } })).map((({ cliente: e }) => e))[0];
            }
            catch (r) {
                console.error("An Error Ocurred when i tried get Clients from the Farm " + e), console.error(r);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async fromFarmGetClient(e, r) { const a = await this.prisma.fazenda.findUnique({ where: { id_fazenda: e }, include: { cliente: { where: { id_client: r }, select: { consumidor: { select: { id_consumidor: !0, nome_consumidor: !0, email: !0, numero_telefone: !0, sexo: !0, caminho_foto_consumidor: !0, localizacao: { select: { cidade: !0, provincia: !0 } }, data_nascimento: !0, createdAt: !0 } } } } } }); let o = { message: "", path: ["fromFarmGetClient", "DatabaseConnection"] }; return a ? null === a ? { ...o, message: "ESTE CLIENTE NAO EXISTE" } : a.cliente.map((({ consumidor: e }) => e)) : { ...o, message: "AN ERROR OCCOUR TRYING GET UNIQUE CLIENT" }; }
            async fromFarmGetStatistic(e) { try {
                const r = await this.farmExists(e);
                if (!r)
                    return void console.error("AN ERROR OCCOURS TRYING GET CLIENTS FROM THIS FARM!");
                if (Object.keys(r).includes("message")) {
                    const e = r;
                    return { message: e.message, path: ["fromFarmGetStatistic", "DatabaseConnectionGET", ...e.path] };
                }
                return await this.prisma.monitoramento.findMany({ where: { fazenda_id_fazenda: e }, include: { consumidor: { select: { caminho_foto_consumidor: !0, data_nascimento: !0, email: !0, localizacao: { select: { cidade: !0, provincia: !0 } }, nome_consumidor: !0, numero_telefone: !0, sexo: !0, compras: { select: { produto: { select: { nome_produto: !0, preco_produto: !0, descricao: !0 } } } } } }, produto: { select: { caminho_foto_produto: !0, nome_produto: !0, categoria: { select: { nome_categoria: !0 } }, descricao: !0, disponivel: !0, servico_entrega_disponivel: !0, preco_produto: !0, id_produto: !0, createdAt: !0, produtos_vendidos: { select: { produto: { select: { nome_produto: !0, preco_produto: !0, descricao: !0, categoria: { select: { nome_categoria: !0 } } } } } } } } } });
            }
            catch (r) {
                console.error("An Error Ocurred when i tried get Statistics from the Farm " + e), console.error(r);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async fromFarmGetProductsByCategory(e, r) { const a = await this.farmExists(e); if (a) {
                if (a && Object.keys(a).includes("message")) {
                    const e = Object(a);
                    return { message: e.message, path: ["fromFarmGetProductsByCategory", "DatabaseConnectionGET", ...e] };
                }
                return (await this.prisma.fazenda.findMany({ where: { produto: { every: { categoria_id_categoria: { equals: r } } } }, include: { produto: !0 } })).map((({ produto: e }) => e))[0];
            } console.error("ERROR TRYING CHECK FARM"); }
            async getProductByCategory(e) { return null === await this.prisma.categoria.findUnique({ where: { id_categoria: e } }) ? { message: "ESTA CATEGORIA NAO EXISTE", path: ["getProductByCategory", "DatabaseConnectionGET"] } : await this.prisma.produto.findMany({ where: { categoria: { is: { id_categoria: e } } } }); }
            async getWishListCostumer(e) { try {
                const r = await this.prisma.produtoFavorito.findMany({ where: { consumidor_id_consumidor: e }, select: { produto: { select: { id_produto: !0, caminho_foto_produto: !0, categoria: { select: { nome_categoria: !0 } }, nome_produto: !0, preco_produto: !0, descricao: !0, createdAt: !0, disponivel: !0, servico_entrega_disponivel: !0 } } } });
                return r && null !== r && 0 !== r.length ? r : void console.error("This [Costumer] doesn't exists");
            }
            catch (r) {
                console.error("An Error Ocurred when i tried get Favorite Product from the Client " + e), console.error(r);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async getCartCostumer(e) { try {
                const r = await this.prisma.carrinho.findMany({ where: { consumidor_id_consumidor: e }, select: { produto: { select: { id_produto: !0, caminho_foto_produto: !0, categoria: { select: { nome_categoria: !0 } }, nome_produto: !0, preco_produto: !0, descricao: !0, createdAt: !0, disponivel: !0, servico_entrega_disponivel: !0 } } } });
                return r && null !== r && 0 !== r.length ? r : void console.error("This [Costumer] doesn't exists");
            }
            catch (r) {
                console.error("An Error Ocurred when i tried get Cart from the Client " + e), console.error(r);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async getFavoriteFarm(e) { try {
                const r = await this.prisma.fazendaFavorita.findMany({ where: { consumidor_id_consumidor: e }, select: { fazenda: { select: { id_fazenda: !0, nome_fazenda: !0, createdAt: !0 } } } });
                return r && null !== r && 0 !== r.length ? r : void console.error("This [Favorite Farm] doesn't exists");
            }
            catch (r) {
                console.error("An Error Ocurred when i tried get Favorite Farm from the Client " + e), console.error(r);
            }
            finally {
                await this.prisma.$disconnect();
            } }
            async fromDatabaseGetUser(e) { const r = await this.prisma.consumidor.findUnique({ where: { email: e } }), a = await this.prisma.fazendeiro.findUnique({ where: { email: e } }); return null !== r ? { field: "customer", status: !0 } : null !== a ? { field: "farmer", status: !0 } : { field: "default", status: !1 }; }
        } }, 68: (e, r, a) => { a.a(e, (async (e, o) => { try {
            a.d(r, { M: () => E });
            var t = a(391), n = a(252), i = a.n(n), s = a(67), c = a.n(s), d = a(577), l = a.n(d), m = a(975), u = a(158), p = a(905), f = a(740), h = a(344), _ = a(710), y = a(133);
            const e = i()(), E = c().createServer(e), R = (0, m.debuglog)("server"), w = (...e) => e.map((e => e.addPlugin((0, y.ApolloServerPluginDrainHttpServer)({ httpServer: E }))));
            e.use(l()({ origin: "*", optionsSuccessStatus: 200 })), e.use(i().urlencoded({ extended: !1 })), e.use(i().json());
            const g = [u.A, p.A, f.A, h.A];
            w(...g), await Promise.all(g.map((e => e.start()))).then((e => { R("All server are running"); })).catch((e => { R("ERRO AO EXECUTAR TODOS OS SERVIDORES"), R(e); })), e.use("/v1/farmer/create", (0, t.expressMiddleware)(u.A, { context: async ({ req: e, res: r }) => ({ token: "" }) })), e.use("/v1/costumer/create", (0, t.expressMiddleware)(p.A, { context: async ({ req: e, res: r }) => ({ token: "" }) })), e.use("/v1/set", (0, t.expressMiddleware)(f.A)), e.use("/v1/farmer/farmID", (0, t.expressMiddleware)(h.A)), e.use(_.A), e.get("/v1/", ((e, r) => r.status(200).json({ message: "NÃO HÁ NADA AQUI! VOCÊ SE FUD3U" }))), o();
        }
        catch (e) {
            o(e);
        } }), 1); }, 710: (e, r, a) => { a.d(r, { A: () => t }); const o = (0, a(252).Router)(); o.get("/v1/bi/:bi", (async (e, r) => { try {
            const { bi: a } = e.params, o = await fetch(`https://digital.ao/ao/actions/bi.ajcall.php?bi=${a}`, { method: "GET" }), { success: t, data: n, error: i } = await o.json();
            return !t && i ? r.status(404).json({ status: i.code || 404, message: i.message }).end() : r.status(202).json(n).end();
        }
        catch (e) {
            console.error(e);
        } })); const t = o; }, 985: (e, r, a) => { a.d(r, { kf: () => i, I: () => n }); const o = require("env-var"); var t = a.n(o); const n = t().get("PORT").required().asIntPositive(), i = (t().get("JWT_SECRET").required().asString(), t().get("BCRYPT_SALT").required().asIntPositive()); }, 299: e => { e.exports = require("@apollo/server"); }, 391: e => { e.exports = require("@apollo/server/express4"); }, 133: e => { e.exports = require("@apollo/server/plugin/drainHttpServer"); }, 530: e => { e.exports = require("@apollo/subgraph"); }, 577: e => { e.exports = require("cors"); }, 252: e => { e.exports = require("express"); }, 684: e => { e.exports = require("graphql-tag"); }, 24: e => { e.exports = require("node:fs"); }, 67: e => { e.exports = require("node:http"); }, 760: e => { e.exports = require("node:path"); }, 136: e => { e.exports = require("node:url"); }, 975: e => { e.exports = require("node:util"); } }, n = {};
    function i(e) { var r = n[e]; if (void 0 !== r)
        return r.exports; var a = n[e] = { exports: {} }; return t[e](a, a.exports, i), a.exports; }
    e = "function" == typeof Symbol ? Symbol("webpack queues") : "__webpack_queues__", r = "function" == typeof Symbol ? Symbol("webpack exports") : "__webpack_exports__", a = "function" == typeof Symbol ? Symbol("webpack error") : "__webpack_error__", o = e => { e && e.d < 1 && (e.d = 1, e.forEach((e => e.r--)), e.forEach((e => e.r-- ? e.r++ : e()))); }, i.a = (t, n, i) => { var s; i && ((s = []).d = -1); var c, d, l, m = new Set, u = t.exports, p = new Promise(((e, r) => { l = r, d = e; })); p[r] = u, p[e] = e => (s && e(s), m.forEach(e), p.catch((e => { }))), t.exports = p, n((t => { var n; c = (t => t.map((t => { if (null !== t && "object" == typeof t) {
        if (t[e])
            return t;
        if (t.then) {
            var n = [];
            n.d = 0, t.then((e => { i[r] = e, o(n); }), (e => { i[a] = e, o(n); }));
            var i = {};
            return i[e] = e => e(n), i;
        }
    } var s = {}; return s[e] = e => { }, s[r] = t, s; })))(t); var i = () => c.map((e => { if (e[a])
        throw e[a]; return e[r]; })), d = new Promise((r => { (n = () => r(i)).r = 0; var a = e => e !== s && !m.has(e) && (m.add(e), e && !e.d && (n.r++, e.push(n))); c.map((r => r[e](a))); })); return n.r ? d : i(); }), (e => (e ? l(p[a] = e) : d(u), o(s)))), s && s.d < 0 && (s.d = 0); }, i.n = e => { var r = e && e.__esModule ? () => e.default : () => e; return i.d(r, { a: r }), r; }, i.d = (e, r) => { for (var a in r)
        i.o(r, a) && !i.o(e, a) && Object.defineProperty(e, a, { enumerable: !0, get: r[a] }); }, i.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r), i(156);
})();
//# sourceMappingURL=bundle.js.map