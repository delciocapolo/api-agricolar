import { PrismaClient } from "@prisma/client"
import type {
    Monitoramento,
    Carrinho,
    Consumidor,
    Sexo,
    Localizacao,
    $Enums,
    ProdutoFavorito,
    Produto,
    Fazendeiro,
    Fazenda,
    Categoria,
    Role
} from "@prisma/client";

type CostumerAndProductType = {
    id_consumidor: string;
    id_produto: string;
}
type CostumerAndFarmType = {
    id_consumidor: string;
    id_fazenda: string;
}
type CreateFarmType = {
    id_fazendeiro: string;
    email: string
}
type CreateProductType = {
    id_fazenda: string;
    categoria: Categoria;
};
type SellProductType = {
    id_fazenda: string;
    produto: Produto
}

type EmployeeRoletype = "Admin da Fazenda" | "Adicionar Produto" | "Criar Stock" | "Remover Produto" | "Criar Categoria";

type CreateEmployeetype = {
    id_fazenda: string;
    id_consumidor: string;
    privilegio: Role;
}

export class DatabaseConnectionPOST {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
        this.prisma.$connect();
    }
    // metodos para consumidores
    async createCostumer(consumidor: Consumidor | Consumidor[], localizacao: Localizacao) {
        try {
            if (Array.isArray(consumidor)) {
                const data = await this.prisma['consumidor'].createMany({
                    data: consumidor,
                });
                return data;
            }
            const data = await this.prisma['consumidor'].create({
                data: {
                    nome_consumidor: consumidor.nome_consumidor,
                    email: consumidor.email,
                    numero_telefone: consumidor.numero_telefone,
                    senha: consumidor.senha,
                    sexo: consumidor.sexo,
                    caminho_foto_consumidor: consumidor.caminho_foto_consumidor,
                    data_nascimento: consumidor.data_nascimento,
                    localizacao: {
                        create: {
                            cidade: localizacao.cidade,
                            provincia: localizacao.provincia,
                        }
                    },
                },
                include: {
                    localizacao: true
                }
            })

            return data;
        } catch (error) {
            console.error("CREATE COSTUMER, [ERROR]: ");
            console.error(error);
        } finally {
            this.prisma.$disconnect();
        }
    }

    async createWishList({ id_consumidor, id_produto }: CostumerAndProductType) {
        try {
            const data = await this.prisma['produtoFavorito'].create({
                data: {
                    consumidor_id_consumidor: id_consumidor,
                    produto_id_produto: id_produto
                }
            });
            return data;
        } catch (error) {
            console.error("CREATE WISH LIST, [ERROR]: ");
            console.error(error);
        } finally {
            this.prisma.$disconnect();
        }
    }

    async addToCart({ id_consumidor, id_produto }: CostumerAndProductType) {
        try {
            const data = await this.prisma['carrinho'].create({
                data: {
                    consumidor_id_consumidor: id_consumidor,
                    produto_id_produto: id_produto
                }
            });

            return data;
        } catch (error) {
            console.error("ADD TO CART, [ERROR]: ");
            console.error(error);
        } finally {
            this.prisma.$disconnect();
        }
    }

    async createFarvoriteFarm({ id_consumidor, id_fazenda }: CostumerAndFarmType) {
        try {
            const data = await this.prisma['fazendaFavorita'].create({
                data: {
                    consumidor_id_consumidor: id_consumidor,
                    fazenda_id_fazenda: id_fazenda
                }
            });

            return data;
        } catch (error) {
            console.error("CREATE FAVORITE FARM, [ERROR]: ");
            console.error(error);
        } finally {
            this.prisma.$disconnect();
        }
    };

    // Implementacao do CRUD para fazendeiro

    async createFarmer(fazendeiro: Fazendeiro | Fazendeiro[], localizacao: Localizacao) {
        try {
            if (Array.isArray(fazendeiro)) {
                const data = await this.prisma['fazendeiro'].createMany({
                    data: fazendeiro
                });
                return data;
            }
            const data = await this.prisma['fazendeiro'].create({
                data: {
                    nome_fazendeiro: fazendeiro.nome_fazendeiro,
                    email: fazendeiro.email,
                    data_nascimento: fazendeiro.data_nascimento,
                    sexo: fazendeiro.sexo,
                    caminho_foto_fazendeiro: fazendeiro.caminho_foto_fazendeiro,
                    localizacao: {
                        create: {
                            cidade: localizacao.cidade,
                            provincia: localizacao.provincia,
                        }
                    },
                }
            });
            return data;
        } catch (error) {
            console.error("CREATE FARMER, [ERROR]: ");
            console.error(error);
        } finally {
            this.prisma.$disconnect();
        }
    }

    async createFarm({ id_fazendeiro, email }: CreateFarmType, fazenda: Fazenda) {
        try {
            const existsFarmer = await this.prisma['fazendeiro'].findUnique({
                where: {
                    id_fazendeiro
                }
            });

            if (existsFarmer === null) {
                console.error('O FAZENDEIRO NAO EXISTE');
                return;
            }

            const data = await this.prisma['fazenda'].create({
                data: {
                    nome_fazenda: fazenda.nome_fazenda,
                    fazendeiro: {
                        connect: {
                            id_fazendeiro
                        }
                    }
                }
            });

            return data;
        } catch (error) {
            console.error("CREATE FARMER, [ERROR]: ");
            console.error(error);
        } finally {
            this.prisma.$disconnect()
        }
    }

    async createProduct({ id_fazenda, categoria }: CreateProductType, produto: Produto) {
        try {
            const existsFarmer = await this.prisma['fazenda'].findUnique({
                where: {
                    id_fazenda
                }
            });

            if (existsFarmer === null) {
                console.error('A FAZENDA NAO EXISTE');
                return;
            }

            const data = await this.prisma['produto'].create({
                data: {
                    nome_produto: produto.nome_produto,
                    preco_produto: produto.preco_produto,
                    caminho_foto_produto: produto.caminho_foto_produto,
                    descricao: produto.descricao,
                    servico_entrega_disponivel: produto.servico_entrega_disponivel,
                    categoria: {
                        connectOrCreate: {
                            where: {
                                nome_categoria: categoria.nome_categoria
                            },
                            create: {
                                nome_categoria: categoria.nome_categoria
                            }
                        }
                    },
                    fazenda: {
                        connect: {
                            id_fazenda
                        }
                    }
                }
            });

            return data;
        } catch (error) {
            console.error("CREATE PRODUCT, [ERROR]: ");
            console.error(error);
        } finally {
            this.prisma.$disconnect()
        }
    }

    async sellProduct({ id_fazenda, produto }: SellProductType) {
        try {
            const existsFarmer = await this.prisma['fazenda'].findUnique({
                where: {
                    id_fazenda
                }
            });

            if (existsFarmer === null) {
                console.error('A FAZENDA NAO EXISTE');
                return;
            }

            const data = await this.prisma['produto'].update({
                where: {
                    id_produto: produto.id_produto
                },
                data: {
                    disponivel: false
                }
            });

            return data;
        } catch (error) {
            console.error("SELL PRODUCT ERROR, [ERROR]: ");
            console.error(error);
        } finally {
            this.prisma.$disconnect()
        }
    }

    async createEmployee({ id_fazenda, id_consumidor, privilegio }: CreateEmployeetype) {
        try {
            const existsFarmer = await this.prisma['fazenda'].findUnique({
                where: {
                    id_fazenda
                }
            });

            const existsCostumer = await this.prisma['consumidor'].findUnique({
                where: {
                    id_consumidor
                }
            });

            if (existsFarmer === null || existsCostumer === null) {
                existsFarmer === null ?
                    console.error('A FAZENDA NAO EXISTE') :
                    console.error('O USUARIO NAO EXISTE NAO EXISTE');
                return;
            }

            const data = await this.prisma['consumidor'].update({
                where: {
                    id_consumidor
                },
                data: {
                    role: privilegio
                },
            });

            return {
                data,
                id_fazenda
            };
        } catch (error) {
            console.error("CREATE EMPLOYEE, [ERROR]: ");
            console.error(error);
        } finally {
            this.prisma.$disconnect()
        }
    }
};

export class DatabaseConnectionGET {
    constructor() {

    }
};