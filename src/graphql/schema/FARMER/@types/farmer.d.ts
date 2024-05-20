import { Colaborador, Consumidor, Fazenda } from "@prisma/client";
import { Sexo } from "./default";

export type FarmerInputType = {
  fazendeiro: {
    bi_fazendeiro: string;
    nome_fazendeiro: string;
    email: string;
    data_nascimento: string;
    caminho_foto_fazendeiro: string;
    sexo: Sexo;
    senha: string;
  };
  localizacao: {
    cidade: string;
    provincia: string;
  };
};

export type FarmInputType = {
  id_fazendeiro: string;
  farm: {
    nif_fazenda: string;
    nome_fazenda: string;
  };
};

export type EmplyeeInputType = {
  id_consumidor: string;
  id_fazenda: string;
};

export type SellProductInputType = Pick<EmplyeeInputType, "id_consumidor"> & {
  id_produto: string;
};

export type ProductTypeInput = {
  id_fazenda: string;
  nome_categoria: string;
  produto: {
    nome_produto: string;
    preco_produto: number;
    caminho_foto_produto: string;
    descricao: string;
    servico_entrega_disponivel: boolean;
  };
};

export type EmployeeTypeSchema = {
  entidade: Fazenda;
  empregado: Consumidor;
} & Colaborador;
