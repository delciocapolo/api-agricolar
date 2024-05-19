import { LocalizacaoType } from "../../../@types/graphqlType";

export type Role = "Farmer" | "Employee" | "Costumer";
export type Sexo = "M" | "F";

export type FazendeiroSchemaType = {
  id_fazendeiro: string;
  nome_fazendeiro: string;
  email: string;
  quantidade_fazendas: number;
  sexo: Sexo;
  data_nascimento: Date;
  caminho_foto_fazendeiro: string;
  createdAt: Date;
  localizacao: LocalizacaoType;
};

export type CategoriaSchemaType = {
    nome_categoria: string
}

export type ProdutoSchemaType = {
  createdAt: Date;
  id_produto: string;
  nome_produto: string;
  preco_produto: number;
  caminho_foto_produto: string;
  descricao: string | null;
  servico_entrega_disponivel: boolean | null;
  disponivel: boolean | null;
  categoria: CategoriaSchemaType;
};

export type StockSchemaType = {
  id_stock: string;
  nome_produto: string;
  quantidade_disponivel: number | null;
  stock_inicial: number;
  createdAt: Date;
  fazenda_id_fazenda: string;
};

export type StatisticsType = {
  id_monitoramento: string;
  consumidor: {
    nome_consumidor: string;
    email: string;
    sexo: Sexo;
    numero_compras: number | null;
    numero_telefone: string;
    compras: {
      produto: {
        nome_produto: string;
        preco_produto: number;
        caminho_foto_produto: string;
        descricao: string | null;
      };
    }[];
    localizacao: LocalizacaoType;
  };
};

export type ClientOnlyType = {
  id_consumidor: string;
  nome_consumidor: string;
  email: string;
  numero_telefone: string;
  sexo: Sexo;
  data_nascimento: Date;
  caminho_foto_consumidor: string | null;
  localizacao: LocalizacaoType;
  createdAt: Date;
};

export type ClientsType = {
    id_client: string;
    consumidor: ClientOnlyType;
}

export type FazendaAndProduct = {
    id_fazenda: string;
    id_product: string;
}
export type FazendaAndSoldProduct = {
    id_fazenda: string;
    id_monitoramento: string;
}
export type FazendaOnly = {
    id_fazenda: string;
    id_sold_product: string;
}
export type CategoriaOnly = {
    id_categoria: number;
}
export type FazendaAndClient = {
    id_fazenda: string;
    id_client: string;
}