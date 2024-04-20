import { PrismaClient } from "@prisma/client/default.js";
import type {
  Consumidor,
  Localizacao,
  Produto,
  Fazendeiro,
  Fazenda,
} from "@prisma/client";
import type {
  CostumerAndProductType,
  CostumerAndFarmType,
  CreateClient,
  CreateEmployeetype,
  CreateFarmType,
  CreateProductType,
  SellProductType,
} from "./@types/type";
import { debuglog } from "util";
import { FarmInputType, FarmerInputType, ProductTypeInput, SellProductInputType } from "../graphql/schema/POST/create/@types/farmer";

const log = debuglog('database');

export class DatabaseConnectionPOST {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
    this.prisma.$connect().then(_ => {
      log(`Conexão com Banco de Dados [${DatabaseConnectionPOST.name}] estabelecida com sucesso`);
    });
  }
  // metodos para consumidores
  async createCostumer(
    consumidor: Consumidor | Consumidor[],
    localizacao: Localizacao
  ) {
    try {
      if (Array.isArray(consumidor)) {
        const data = await this.prisma["consumidor"].createMany({
          data: consumidor,
        });
        return data;
      }
      const data = await this.prisma["consumidor"].create({
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
            },
          },
        },
        include: {
          localizacao: true,
        },
      });

      return data;
    } catch (error) {
      console.error("CREATE COSTUMER, [ERROR]: ");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async createWishList({ id_consumidor, id_produto }: CostumerAndProductType) {
    try {
      const data = await this.prisma["produtoFavorito"].create({
        data: {
          consumidor_id_consumidor: id_consumidor,
          produto_id_produto: id_produto,
        },
      });
      return data;
    } catch (error) {
      console.error("CREATE WISH LIST, [ERROR]: ");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async addToCart({ id_consumidor, id_produto }: CostumerAndProductType) {
    try {
      const data = await this.prisma["carrinho"].create({
        data: {
          consumidor_id_consumidor: id_consumidor,
          produto_id_produto: id_produto,
        },
      });

      return data;
    } catch (error) {
      console.error("ADD TO CART, [ERROR]: ");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async createFarvoriteFarm({
    id_consumidor,
    id_fazenda,
  }: CostumerAndFarmType) {
    try {
      const data = await this.prisma["fazendaFavorita"].create({
        data: {
          consumidor_id_consumidor: id_consumidor,
          fazenda_id_fazenda: id_fazenda,
        },
      });

      return data;
    } catch (error) {
      console.error("CREATE FAVORITE FARM, [ERROR]: ");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  // Implementacao do CRUD para fazendeiro

  async createFarmer({ fazendeiro, localizacao }: FarmerInputType) {
    try {
      if (Array.isArray(fazendeiro)) {
        const data = await this.prisma["fazendeiro"].createMany({
          data: fazendeiro,
        });
        return data;
      }
      const data = await this.prisma["fazendeiro"].create({
        data: {
          nome_fazendeiro: fazendeiro.nome_fazendeiro,
          email: fazendeiro.email,
          data_nascimento: new Date(fazendeiro.data_nascimento),
          sexo: fazendeiro.sexo,
          caminho_foto_fazendeiro: fazendeiro.caminho_foto_fazendeiro,
          localizacao: {
            create: {
              cidade: localizacao.cidade,
              provincia: localizacao.provincia,
            },
          },
        },
      });
      return data;
    } catch (error) {
      console.error("CREATE FARMER, [ERROR]: ");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async createFarm({ id_fazendeiro, fazenda }: FarmInputType) {
    try {
      const existsFarmer = await this.prisma["fazendeiro"].findUnique({
        where: {
          id_fazendeiro,
        },
      });

      if (existsFarmer === null) {
        console.error("O FAZENDEIRO NAO EXISTE");
        return;
      }

      const data = await this.prisma["fazenda"].create({
        data: {
          nome_fazenda: fazenda.nome_fazenda,
          fazendeiro: {
            connect: {
              id_fazendeiro,
            },
          },
        },
      });

      return data;
    } catch (error) {
      console.error("CREATE FARMER, [ERROR]: ");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async createProduct({ id_fazenda, nome_categoria, produto }: ProductTypeInput) {
    try {
      const existsFarmer = await this.prisma["fazenda"].findUnique({
        where: {
          id_fazenda,
        },
      });

      if (existsFarmer === null) {
        console.error("A FAZENDA NAO EXISTE");
        return;
      }

      const data = await this.prisma["produto"].create({
        data: {
          nome_produto: produto.nome_produto,
          preco_produto: produto.preco_produto,
          caminho_foto_produto: produto.caminho_foto_produto,
          descricao: produto.descricao,
          servico_entrega_disponivel: produto.servico_entrega_disponivel,
          categoria: {
            connectOrCreate: {
              where: {
                nome_categoria,
              },
              create: {
                nome_categoria,
              },
            },
          },
          fazenda: {
            connect: {
              id_fazenda,
            },
          },
        },
        select: {
          id_produto: true,
          nome_produto: true,
          descricao: true,
          categoria: {
            select: {
              id_categoria: true,
              nome_categoria: true
            },
          },
          caminho_foto_produto: true,
          createdAt: true,
          disponivel: true,
          preco_produto: true,
          servico_entrega_disponivel: true,
          fazenda: {
            select: {
              nome_fazenda: true,
            }
          }
        }
      });

      return data;
    } catch (error) {
      console.error("CREATE PRODUCT, [ERROR]: ");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async sellProduct({ id_consumidor, id_produto }: SellProductInputType) {
    try {
      const farmerExists = await this.prisma["consumidor"].findUnique({
        where: {
          id_consumidor,
        },
      });

      const costumerExists = await this.prisma['produto'].findUnique({
        where: {
          id_produto
        }
      });

      if (farmerExists === null || costumerExists === null) {
        console.error("A FAZENDA NAO EXISTE");
        return;
      }

      const data = await this.prisma["produto"].update({
        where: {
          id_produto,
        },
        data: {
          disponivel: false,
        },
      });

      await this.prisma['monitoramento'].create({
        data: {
          consumidor_id_consumirdor: id_consumidor,
          produto_id_produto: data.id_produto,
          fazenda_id_fazenda: data.fazenda_id_fazenda
        }
      });

      return data;
    } catch (error) {
      console.error("SELL PRODUCT ERROR, [ERROR]: ");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async createEmployee({
    id_fazenda,
    id_consumidor,
    privilegio,
  }: CreateEmployeetype) {
    try {
      const existsFarmer = await this.prisma["fazenda"].findUnique({
        where: {
          id_fazenda,
        },
      });

      const existsCostumer = await this.prisma["consumidor"].findUnique({
        where: {
          id_consumidor,
        },
      });

      if (existsFarmer === null || existsCostumer === null) {
        existsFarmer === null
          ? console.error("A FAZENDA NAO EXISTE")
          : console.error("O USUARIO NAO EXISTE");
        return;
      }

      await this.prisma["consumidor"].update({
        where: {
          id_consumidor,
        },
        data: {
          role: "Employee",
        },
      });

      const data = await this.prisma["colaborador"].create({
        data: {
          empregado: {
            connect: {
              id_consumidor,
            },
          },
          entidade: {
            connect: {
              id_fazenda,
            },
          },
        },
        include: {
          empregado: true,
          entidade: true,
        },
      });

      return data;
    } catch (error) {
      console.error("CREATE EMPLOYEE, [ERROR]: ");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

export class DatabaseConnectionGET {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
    this.prisma.$connect().then(_ => {
      log(`Conexão com Banco de Dados [${DatabaseConnectionGET.name}] estabelecida com sucesso`);
    });
  }

  // GET PUBLICS
  async getUsers(limit?: number) {
    try {
      if (limit) {
        const users = await this.prisma["consumidor"].findMany({
          take: limit,
        });
        return users;
      }
      const users = await this.prisma["consumidor"].findMany();
      return users;
    } catch (error) {
      console.error("ERROR TO GET USERS");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async getFarmers(limit?: number) {
    try {
      if (limit) {
        const farmers = await this.prisma["fazendeiro"].findMany({
          take: limit,
        });
        return farmers;
      }
      const farmers = await this.prisma["fazendeiro"].findMany();
      return farmers;
    } catch (error) {
      console.error("ERROR TO GET FARMER");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async getProducts(limit?: number) {
    try {
      if (limit) {
        const products = await this.prisma["produto"].findMany({
          take: limit,
        });
        return products;
      }
      const products = await this.prisma["produto"].findMany();
      return products;
    } catch (error) {
      console.error("ERROR TO GET PRODUCT");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async getSoldProduct(limit?: number, id_sold_product?: string) {
    try {
      if (id_sold_product) {
        const datas = await this.prisma["monitoramento"].findUnique({
          where: {
            id_monitoramento: id_sold_product,
          },
        });

        if (datas === null) {
          console.error("Can't to find sold product");
          return;
        }

        return datas;
      }

      if (limit) {
        const soldProducts = await this.prisma["monitoramento"].findMany({
          take: limit,
          include: {
            produto: true,
            consumidor: true,
            fazenda: true,
          },
        });

        return soldProducts;
      }
      const soldProducts = await this.prisma["monitoramento"].findMany({
        include: {
          produto: true,
          consumidor: true,
          fazenda: true,
        },
      });

      return soldProducts;
    } catch (error) {
      console.error("ERROR TO GET SOLD PRODUCTS");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  // Implementando [GET] para [Fazendeiro]
  async getProduct(id_produto: string) {
    try {
      const product = await this.prisma["produto"].findUnique({
        where: {
          id_produto,
        },
      });

      if (product === null) {
        console.error("This Products doesn't exists");
        return;
      }

      return product;
    } catch (error) {
      console.error("ERROR TO GET PRODUCT");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async fromFarmGetProducts(id_fazenda: string) {
    try {
      const fromFarmProducts = await this.prisma["fazenda"].findMany({
        where: {
          id_fazenda,
        },
        include: {
          produto: true,
        },
      });

      if (!fromFarmProducts) {
        console.error("This product doesn't exists " + id_fazenda);
        return;
      }

      return fromFarmProducts.map((product) => product.produto);
    } catch (error) {
      console.error("Can't Get Products from farm " + id_fazenda);
      console.error();
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async farmExists(id_fazenda: string) {
    try {
      const farmExists = await this.prisma["fazenda"].findUnique({
        where: {
          id_fazenda,
        },
      });

      if (farmExists === null) {
        return {
          message: "This farm doesn't exists",
          status: false,
        };
      }

      return {
        message: farmExists.nome_fazenda!,
        status: true,
      };
    } catch (error) {
      console.error(
        "An Error Ocurred when i tried get Products from the Farm " + id_fazenda
      );
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async fromFarmGetProductSolds(id_fazenda: string) {
    try {
      const status = await this.farmExists(id_fazenda);

      if (!status?.status) {
        console.error(status?.message);
        return;
      }

      const fromFarmProducts = await this.prisma["monitoramento"].findMany({
        where: {
          fazenda_id_fazenda: id_fazenda,
        },
        include: {
          produto: true,
        },
      });

      return fromFarmProducts.map((product) => product.produto);
    } catch (error) {
      console.error(
        "An Error Ocurred when i tried get Products from the Farm " + id_fazenda
      );
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async getStock(id_fazenda: string) {
    try {
      const status = await this.farmExists(id_fazenda);

      if (!status?.status) {
        console.error(status?.message);
        return;
      }

      const stock = await this.prisma["stock"].findMany({
        where: {
          fazenda_id_fazenda: id_fazenda,
        },
      });

      return stock;
    } catch (error) {
      console.error(
        "An Error Ocurred when i tried get Stock from the Farm " + id_fazenda
      );
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async getCategory(id_categoria: number) {
    try {
      const category = await this.prisma["categoria"].findUnique({
        where: {
          id_categoria,
        },
      });

      if (category === null) {
        console.error("This category doesn't exists");
        return;
      }

      return category;
    } catch (error) {
      console.error(
        "An Error Ocurred when i tried get Category" + id_categoria
      );
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async getCategories(limit?: number) {
    try {
      if (limit) {
        const categories = await this.prisma["categoria"].findMany({
          take: limit,
        });

        return categories;
      }

      const categories = await this.prisma["categoria"].findMany();
      return categories;
    } catch (error) {
      console.error("An Error Ocurred when i tried get Categories");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async createClient({ id_consumidor, id_fazenda }: CreateClient) {
    try {
      const farm = await this.prisma["fazenda"].findUnique({
        where: {
          id_fazenda,
        },
      });

      const costumer = await this.prisma["consumidor"].findUnique({
        where: {
          id_consumidor,
        },
      });

      if (costumer === null || farm === null) {
        costumer === null
          ? console.error("This [User] doesn't exists")
          : console.error("This [Farm] doesn't exists");
        return;
      }

      const client = await this.prisma["clienteDaFazenda"].create({
        data: {
          consumidor: {
            connect: {
              id_consumidor,
            },
          },
          fazenda: {
            connect: {
              id_fazenda,
            },
          },
        },
      });

      return client;
    } catch (error) {
      console.error(
        "An Error Ocurred when i tried create Clients from the Farm " +
        id_fazenda
      );
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async getClientsFromFarm(id_fazenda: string) {
    try {
      const status = await this.farmExists(id_fazenda);

      if (status?.status !== undefined && !status.status) {
        console.error(status.message);
        return;
      }

      const clients = await this.prisma["fazenda"].findMany({
        where: {
          id_fazenda,
        },
        include: {
          cliente: {
            include: {
              consumidor: {
                select: {
                  _count: true,
                  nome_consumidor: true,
                  data_nascimento: true,
                  email: true,
                  localizacao: {
                    select: {
                      cidade: true,
                      provincia: true,
                    },
                  },
                  sexo: true,
                  numero_telefone: true,
                  caminho_foto_consumidor: true,
                },
              },
            },
          },
        },
      });

      const listClint = clients.map((client) => client.cliente);
      const clients_only = listClint.map(
        (result, index = result.length) => result[index]?.consumidor
      );

      return clients_only;
    } catch (error) {
      console.error(
        "An Error Ocurred when i tried get Clients from the Farm " + id_fazenda
      );
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async getStatisticFromFarm(id_fazenda: string) {
    try {
      const status = await this.farmExists(id_fazenda);

      if (status?.status !== undefined && !status.status) {
        console.error(status.message);
        return;
      }

      const statistics = await this.prisma["monitoramento"].findMany({
        where: {
          fazenda_id_fazenda: id_fazenda,
        },
        include: {
          consumidor: {
            select: {
              caminho_foto_consumidor: true,
              data_nascimento: true,
              email: true,
              localizacao: {
                select: {
                  cidade: true,
                  provincia: true,
                },
              },
              nome_consumidor: true,
              numero_telefone: true,
              sexo: true,
              compras: {
                select: {
                  produto: {
                    select: {
                      nome_produto: true,
                      preco_produto: true,
                      descricao: true,
                    },
                  },
                },
              },
            },
          },
          produto: {
            select: {
              caminho_foto_produto: true,
              nome_produto: true,
              categoria: {
                select: {
                  nome_categoria: true,
                },
              },
              descricao: true,
              disponivel: true,
              servico_entrega_disponivel: true,
              preco_produto: true,
              id_produto: true,
              createdAt: true,
              produtos_vendidos: {
                select: {
                  produto: {
                    select: {
                      nome_produto: true,
                      preco_produto: true,
                      descricao: true,
                      categoria: {
                        select: {
                          nome_categoria: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      return statistics;
    } catch (error) {
      console.error(
        "An Error Ocurred when i tried get Statistics from the Farm " +
        id_fazenda
      );
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  // Implementando [GET] para [Consumidor]
  async getWishListCostumer(id_consumidor: string) {
    try {
      const costumer = await this.prisma["produtoFavorito"].findMany({
        where: {
          consumidor_id_consumidor: id_consumidor,
        },
        select: {
          produto: {
            select: {
              id_produto: true,
              caminho_foto_produto: true,
              categoria: {
                select: {
                  nome_categoria: true,
                },
              },
              nome_produto: true,
              preco_produto: true,
              descricao: true,
              createdAt: true,
              disponivel: true,
              servico_entrega_disponivel: true,
            },
          },
        },
      });

      if (!costumer || costumer === null || costumer.length === 0) {
        console.error("This [Costumer] doesn't exists");
        return;
      }

      return costumer;
    } catch (error) {
      console.error(
        "An Error Ocurred when i tried get Favorite Product from the Client " +
        id_consumidor
      );
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async getCartCostumer(id_consumidor: string) {
    try {
      const costumer = await this.prisma["carrinho"].findMany({
        where: {
          consumidor_id_consumidor: id_consumidor,
        },
        select: {
          produto: {
            select: {
              id_produto: true,
              caminho_foto_produto: true,
              categoria: {
                select: {
                  nome_categoria: true,
                },
              },
              nome_produto: true,
              preco_produto: true,
              descricao: true,
              createdAt: true,
              disponivel: true,
              servico_entrega_disponivel: true,
            },
          },
        },
      });

      if (!costumer || costumer === null || costumer.length === 0) {
        console.error("This [Costumer] doesn't exists");
        return;
      }

      return costumer;
    } catch (error) {
      console.error(
        "An Error Ocurred when i tried get Cart from the Client " +
        id_consumidor
      );
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async getFavoriteFarm(id_consumidor: string) {
    try {
      const costumer = await this.prisma["fazendaFavorita"].findMany({
        where: {
          consumidor_id_consumidor: id_consumidor,
        },
        select: {
          fazenda: {
            select: {
              id_fazenda: true,
              nome_fazenda: true,
              createdAt: true,
            },
          },
        },
      });

      if (!costumer || costumer === null || costumer.length === 0) {
        console.error("This [Favorite Farm] doesn't exists");
        return;
      }

      return costumer;
    } catch (error) {
      console.error(
        "An Error Ocurred when i tried get Favorite Farm from the Client " +
        id_consumidor
      );
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
