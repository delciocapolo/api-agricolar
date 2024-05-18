import {
  PrismaClient,
} from "@prisma/client";
import type {
  CostumerAndProductType,
  CostumerAndFarmType,
  CreateClient,
  CreateEmployeetype,
} from "./@types/type";
import { debuglog } from "util";
import type { FarmInputType, FarmerInputType, ProductTypeInput, SellProductInputType } from "../graphql/schema/POST/@types/farmer";
import type { CustomerInputType, LocalizacaoInputType } from "../graphql/schema/POST/costumer/@types/CustomerInput";

const log = debuglog('database');

export class DatabaseConnectionPOST {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
    this.prisma.$connect().then((_) => {
      log(
        `Conexão com Banco de Dados [DatabaseConnectionPOST] estabelecida com sucesso`
      );
    });
  }
  // metodos para consumidores
  async createCostumer(
    consumidor: CustomerInputType,
    localizacao: LocalizacaoInputType
  ) {
    try {
      const exists = await this.prisma["consumidor"].findUnique({
        where: {
          email: consumidor.email,
        },
      });

      if (exists !== null) {
        const object_error = {
          error: "O CONSUMIDOR JA EXISTE",
          path: "createCostumer method's class",
        };
        return object_error;
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
        select: {
          id_consumidor: true,
          nome_consumidor: true,
          email: true,
          data_nascimento: true,
          numero_telefone: true,
          sexo: true,
          caminho_foto_consumidor: true,
          createdAt: true,
          localizacao: {
            select: {
              cidade: true,
              provincia: true,
            },
          },
        },
      });

      return data;
    } catch (error) {
      console.error("CREATE CUSTOMER, [ERROR]: ");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async fromCustomerAddToWishList({ id_consumidor, id_produto }: CostumerAndProductType) {
    try {
      const alreadyExistsInWishList = await this.prisma[
        "produtoFavorito"
      ].findUnique({
        where: {
          produto_id_produto_consumidor_id_consumidor: {
            consumidor_id_consumidor: id_consumidor,
            produto_id_produto: id_produto,
          },
        },
      });

      if (alreadyExistsInWishList !== null) {
        const object_error = {
          error: "O PRODUTO JA ESTA NA LISTA DE FAVORITOS",
          path: "createWishList method's class",
        };
        return object_error;
      }

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
      const alreadyExistsInWishList = await this.prisma[
        "carrinho"
      ].findUnique({
        where: {
          produto_id_produto_consumidor_id_consumidor: {
            consumidor_id_consumidor: id_consumidor,
            produto_id_produto: id_produto,
          },
        },
      });

      if (alreadyExistsInWishList !== null) {
        const object_error = {
          error: "O PRODUTO JA ESTA NO CARRINHO",
          path: "addToCarts method's class",
        };
        return object_error;
      }

      const data = await this.prisma["carrinho"].create({
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

  async createFarvoriteFarm({
    id_consumidor,
    id_fazenda,
  }: CostumerAndFarmType) {
    try {
      const alreadyExistsInFavoriteFarm = await this.prisma['fazendaFavorita']
      .findUnique({
        where: {
          consumidor_id_consumidor_fazenda_id_fazenda: {
            consumidor_id_consumidor: id_consumidor,
            fazenda_id_fazenda: id_fazenda
          }
        }
      })
      
      if (alreadyExistsInFavoriteFarm !== null) {
        const object_error = {
          error: "ESTA FAZENDA, JA EXISTE NA LISTA DE FAVORITAS",
          path: "createFarvoriteFarm method's class",
        };
        return object_error;
      }

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
      const exists = await this.prisma["fazendeiro"].findUnique({
        where: {
          email: fazendeiro.email,
        },
      });

      if (exists !== null) {
        const object_error = {
          error: "O FAZENDEIRO JA EXISTE",
          path: "createFarmer method's class",
        };
        return object_error;
      }

      const data = await this.prisma["fazendeiro"].create({
        data: {
          nome_fazendeiro: fazendeiro.nome_fazendeiro,
          email: fazendeiro.email,
          senha: fazendeiro.senha,
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
        select: {
          id_fazendeiro: true,
          nome_fazendeiro: true,
          caminho_foto_fazendeiro: true,
          email: true,
          createdAt: true,
          sexo: true
        }
      });
      return data;
    } catch (error) {
      console.error("CREATE FARMER, [ERROR]: ");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async createFarm({ id_fazendeiro, farm }: FarmInputType) {
    try {
      const existsFarmer = await this.prisma["fazendeiro"].findUnique({
        where: {
          id_fazendeiro,
        },
      });
      const existsFarm = await this.prisma["fazenda"].findUnique({
        where: {
          nome_fazenda: farm.nome_fazenda,
        },
      });

      if (existsFarmer === null) {
        const object_error = {
          message: "O FAZENDEIRO NAO EXISTE",
          path: "createFarm method's class",
        };
        return object_error;
      }

      if (existsFarm !== null) {
        const object_error = {
          message: `A ${farm.nome_fazenda} FAZENDA JA EXISTE`,
          path: "createFarm method's class",
        };
        return object_error;
      }

      const data = await this.prisma["fazenda"].create({
        data: {
          nome_fazenda: farm.nome_fazenda,
          fazendeiro: {
            connect: {
              id_fazendeiro,
            },
          },
        },
      });

      return data;
    } catch (error) {
      console.error("CREATE FARM, [ERROR]: ");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async createProduct({
    id_fazenda,
    nome_categoria,
    produto,
  }: ProductTypeInput) {
    try {
      const existsFarmer = await this.prisma["fazenda"].findUnique({
        where: {
          id_fazenda,
        },
      });

      if (existsFarmer === null) {
        const object_error = {
          message: "A FAZENDA NAO EXISTE",
          path: ["createProduct", "DatabaseConnection"],
        };
        return object_error;
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
      const costumerExists = await this.prisma["consumidor"].findUnique({
        where: {
          id_consumidor,
        },
      });

      const productExists = await this.prisma["produto"].findUnique({
        where: {
          id_produto,
        },
      });

      if (productExists === null || costumerExists === null) {
        const not_exists = costumerExists === null ? "CONSUMIDOR" : "PRODUTO";
        const object_error = {
          message: `O ${not_exists} NAO EXISTE`,
          path: ["sellProduct", "DatabaseConnectionPOST"],
        };
        return object_error;
      }

      const row = await this.prisma["produto"].update({
        where: {
          id_produto,
        },
        data: {
          disponivel: false,
        },
      });

      await this.prisma["monitoramento"].create({
        data: {
          consumidor_id_consumirdor: id_consumidor,
          produto_id_produto: row.id_produto,
          fazenda_id_fazenda: row.fazenda_id_fazenda,
        },
      });

      return row;
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
      const farmExists = await this.prisma["fazenda"].findUnique({
        where: {
          id_fazenda,
        },
      });

      const costumerExists = await this.prisma["consumidor"].findUnique({
        where: {
          id_consumidor,
        },
      });

      if (farmExists === null || costumerExists === null) {
        const not_exists = farmExists === null ? "Fazenda" : "Consumidor";
        const object_error = {
          message: `O/A ${not_exists} NAO EXISTE`,
          path: ["createEmployee", "DatabaseConnectionPOST"],
        };
        return object_error;
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
}

export class DatabaseConnectionGET {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
    this.prisma.$connect().then(_ => {
      log(
        `Conexão com Banco de Dados [DatabaseConnectionGET] estabelecida com sucesso`
      );
    });
  }

  // GET PUBLICS
  async getCostumers(limit?: number) {
    try {
      if (limit) {
        const rows = await this.prisma["consumidor"].findMany({
          take: limit,
        });
        return rows;
      }
      const rows = await this.prisma["consumidor"].findMany();
      if (!rows || rows.length === 0) {
        const object_error = {
          message: "THERE ARE NOT COSTUMERS",
          path: ['getCostumers', 'DatabaseConnectionGET']
        };
        return object_error;
      }
      return rows;
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
      const rows = await this.prisma["fazendeiro"].findMany();
      if (!rows || rows.length === 0) {
        const object_error = {
          message: "THERE ARE NOT FARMERS",
          path: ['getFarmers', 'DatabaseConnectionGET']
        };
        return object_error;
      }
      return rows;
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

  async getSoldProducts(id_fazenda: string, limit?: number) {
    const these = {
      id_monitoramento: true,
      consumidor: {
        select: {
          nome_consumidor: true,
          email: true,
          numero_compras: true,
          sexo: true,
          numero_telefone: true,
          localizacao: {
            select: {
              cidade: true,
              provincia: true
            }
          },
          compras: {
            where: {
              fazenda_id_fazenda: id_fazenda
            },
            select: {
              produto: {
                select: {
                  nome_produto: true,
                  preco_produto: true,
                  descricao: true,
                  caminho_foto_produto: true,
                }
              }
            }
          }
        }
      }
    };

    try {
      const existsFarm = await this.prisma['fazenda'].findUnique({
        where: {
          id_fazenda
        }
      });

      if (existsFarm === null) {
        const object_error = {
          message: "ESTA FAZENDA NAO EXISTE",
          path: ['getSoldProducts', 'DatabaseConnectionGET']
        };
        return object_error;
      }

      if (limit) {
        const rows = await this.prisma['monitoramento'].findMany({
          where: {
            fazenda_id_fazenda: id_fazenda,
          },
          select: these,
          take: limit
        });

        return rows;
      }

      const rows = await this.prisma['monitoramento'].findMany({
        where: {
          fazenda_id_fazenda: id_fazenda,
        },
        select: these
      });

      return rows;
    } catch (error) {
      console.error('AN ERROR OCCROURS TRYING GET ALL SOLD PRODUCTS!');
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async getSoldProduct(id_fazenda: string, id_monitoramento: string, limit?: number) {
    const these = {
      id_monitoramento: true,
      consumidor: {
        select: {
          nome_consumidor: true,
          email: true,
          numero_compras: true,
          sexo: true,
          numero_telefone: true,
          localizacao: {
            select: {
              cidade: true,
              provincia: true
            }
          },
          compras: {
            where: {
              fazenda_id_fazenda: id_fazenda
            },
            select: {
              produto: {
                select: {
                  nome_produto: true,
                  preco_produto: true,
                  descricao: true,
                  caminho_foto_produto: true,
                }
              }
            }
          }
        }
      }
    };

    try {
      const existsFarm = await this.prisma['fazenda'].findUnique({
        where: {
          id_fazenda
        }
      });

      if (existsFarm === null) {
        const object_error = {
          message: "ESTA FAZENDA NAO EXISTE",
          path: ['getSoldProducts', 'DatabaseConnectionGET']
        };
        return object_error;
      }

      if (limit) {
        const rows = await this.prisma['monitoramento'].findMany({
          where: {
            id_monitoramento
          },
          select: these,
          take: limit
        });

        return rows;
      }

      const rows = await this.prisma['monitoramento'].findUnique({
        where: {
          id_monitoramento
        },
        select: { ...these }
      });

      if (rows === null) {
        const object_error = {
          message: "O PRODUTO VENDIDO, NAO ESTA NA LISTA",
          path: ['getSoldProduct', 'DatabaseConnectionGET']
        };
        return object_error;
      }

      return rows;
    } catch (error) {
      console.error("ERROR TO GET SOLD PRODUCTS");
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  // Implementando [GET] para [Fazendeiro]
  async getProduct(id_fazenda: string, id_produto: string) {
    try {
      const product = await this.prisma['fazenda'].findUnique({
        where: {
          id_fazenda
        },
        include: {
          produto: true
        }
      });

      if (product === null) {
        const object_error = {
          message: "A FAZENDA NAO EXISTE",
          path: ['getProduct', 'DatabaseConnectionGET'],
        };
        return object_error;
      }

      const row = product.produto.find(row => (row.id_produto === id_produto));
      if (!row) {
        const object_error = {
          message: "O PRODUTO NAO ESTA NA SUA LISTA DE ITEMS",
          path: ['getProduct', 'DatabaseConnectionGET'],
        };
        return object_error;
      }
      return row;
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

      if (!fromFarmProducts || fromFarmProducts === null) {
        const object_error = {
          message: "THERE ARE NOT PRODUCTS IN THIS FARM",
          path: ['fromFarmGetProducts', 'DatabaseConnectionGET']
        }
        return object_error;
      }

      const rows = fromFarmProducts.map(({ produto }) => (produto));
      return rows[0];
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

      let object_error: { message: string; path: string[] } = {
        message: '',
        path: ['farmExists', 'DatabaseConnection']
      };

      if (farmExists === null) {
        return ({ ...object_error, message: "THIS FARM DOESNOT EXISTS" });
      }

      if (!farmExists) {
        return ({ ...object_error, message: "AN ERROR OCCOURS TRYING GET FARM" });
      }


      return farmExists;
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
      const farm = await this.farmExists(id_fazenda);

      if (!farm) {
        const object_error = {
          message: 'AN ERROR OCCOURS TRYING GET PRODUCT SOLD, FROM THE FARM',
          path: ['fromFarmGetProductSolds', 'DatabaseConnectionGET']
        };
        return object_error;
      }
      if (Object.keys(farm).includes('message')) {
        const error = Object(farm);
        const object_error = {
          message: error.message,
          path: ['fromFarmGetProductSolds', ...error.path]
        };
        return object_error;
      }

      const fromFarmProducts = await this.prisma["monitoramento"].findMany({
        where: {
          fazenda_id_fazenda: id_fazenda,
        },
        include: {
          produto: true,
        },
      });

      const rows = fromFarmProducts.map(fromFarm => (fromFarm.produto));
      return rows;
    } catch (error) {
      console.error(
        "An Error Ocurred when i tried get Products from the Farm " + id_fazenda
      );
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async getStock(id_fazenda: string, products: boolean = false) {
    try {
      const farm = await this.farmExists(id_fazenda);

      if (!farm || Object.keys(farm).includes('message')) {
        console.error(farm);
        return;
      }

      if (products) {
        // TODO: tornar possivel, retornar os produtos das fazendas
        // alem de, somente, valores padrao da tabela [Stock]
        const stock = await this.prisma["stock"].findMany({
          where: {
            fazenda_id_fazenda: id_fazenda,
          },
        });

        return stock;
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
        const object_error = {
          message: "ESTA CATEGORIA NAO EXISTE",
          path: ['getCategory', 'DatabaseConnectionGET']
        }
        return object_error;
      }

      return category;
    } catch (error) {
      console.error(
        "AN ERROR OCCOUR TRYNG GET CATEGORY, BY ID" + id_categoria
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

  async fromFarmGetClients(id_fazenda: string) {
    try {
      const _ = await this.farmExists(id_fazenda);

      if (!_) {
        console.error('AN ERROR OCCOURS TRYING GET CLIENTS FROM THIS FARM!');
        return;
      }

      if (Object.keys(_).includes('message')) {
        console.error(_);
        return;
      }

      const clients = await this.prisma["fazenda"].findMany({
        where: {
          id_fazenda
        },
        include: {
          cliente: {
            select: {
              id_client: true,
              consumidor: {
                select: {
                  id_consumidor: true,
                  nome_consumidor: true,
                  email: true,
                  numero_telefone: true,
                  sexo: true,
                  data_nascimento: true,
                  createdAt: true,
                  caminho_foto_consumidor: true,
                  localizacao: {
                    select: {
                      cidade: true,
                      provincia: true
                    }
                  }
                }
              }
            }
          }
        }
      });

      const transform = clients.map(({ cliente }) => (cliente));
      return (transform[0]);
    } catch (error) {
      console.error(
        "An Error Ocurred when i tried get Clients from the Farm " + id_fazenda
      );
      console.error(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async fromFarmGetClient(id_fazenda: string, id_client: string) {
    const row = await this.prisma['fazenda'].findUnique({
      where: {
        id_fazenda
      },
      include: {
        cliente: {
          where: {
            id_client
          },
          select: {
            consumidor: {
              select: {
                id_consumidor: true,
                nome_consumidor: true,
                email: true,
                numero_telefone: true,
                sexo: true,
                caminho_foto_consumidor: true,
                localizacao: {
                  select: {
                    cidade: true,
                    provincia: true
                  },
                },
                data_nascimento: true,
                createdAt: true,
              }
            }
          }
        }
      }
    });

    let object_error: { message: string; path: string[] } = {
      message: '',
      path: ['fromFarmGetClient', 'DatabaseConnection']
    };

    if (!row) {
      return { ...object_error, message: 'AN ERROR OCCOUR TRYING GET UNIQUE CLIENT' }
    }

    if (row === null) {
      return { ...object_error, message: "ESTE CLIENTE NAO EXISTE" };
    }

    const transform = row.cliente.map(({ consumidor }) => (consumidor));
    return transform;
  }

  async fromFarmGetStatistic(id_fazenda: string) {
    try {
      const farm = await this.farmExists(id_fazenda);

      if (!farm) {
        console.error('AN ERROR OCCOURS TRYING GET CLIENTS FROM THIS FARM!');
        return;
      }

      if (Object.keys(farm).includes('message')) {
        const error = farm as unknown as {
          message: string;
          path: string[];
        };
        const object_error = {
          message: error.message,
          path: ['fromFarmGetStatistic', 'DatabaseConnectionGET', ...error.path]
        }
        return object_error;
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

  async fromFarmGetProductsByCategory(id_fazenda: string, id_categoria: number) {
    const _ = await this.farmExists(id_fazenda);

    if (!_) {
      console.error("ERROR TRYING CHECK FARM");
      return;
    }

    if (_ && Object.keys(_).includes('message')) {
      const error = Object(_);
      const object_error = {
        message: error.message,
        path: ['fromFarmGetProductsByCategory', 'DatabaseConnectionGET', ...error]
      };
      return object_error;
    }
    const farm = await this.prisma['fazenda'].findMany({
      where: {
        produto: {
          every: {
            categoria_id_categoria: {
              equals: id_categoria
            }
          }
        }
      },
      include: {
        produto: true
      }
    });
    const fromFarmProducts = farm.map(({ produto }) => (produto));
    return fromFarmProducts[0];
  }

  async getProductByCategory(id_categoria: number) {
    const _ = await this.prisma['categoria'].findUnique({
      where: {
        id_categoria
      }
    });

    if (_ === null) {
      const object_error = {
        message: "ESTA CATEGORIA NAO EXISTE",
        path: ['getProductByCategory', 'DatabaseConnectionGET']
      };
      return object_error;
    }

    const products = await this.prisma['produto'].findMany({
      where: {
        categoria: {
          is: {
            id_categoria
          }
        }
      }
    });

    return products;
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

  async fromDatabaseGetUser(email: string) {
    const consumidor_row = await this.prisma['consumidor'].findUnique({
      where: {
        email
      }
    });

    const fazendeiro_row = await this.prisma['fazendeiro'].findUnique({
      where: {
        email
      }
    });

    if (consumidor_row !== null) {
      return {
        field: 'customer',
        status: true
      };
    }
    if (fazendeiro_row !== null) {
      return {
        field: 'farmer',
        status: true
      };
    }

    return {
      field: 'default',
      status: false
    };
  }

}
