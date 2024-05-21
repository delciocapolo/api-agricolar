import { LocalizacaoType } from "../../../@types/graphqlType";

type Sexo = "M" | "F";

// Types | Schema
export type FazendaSchemaType = {
  id_fazenda: string;
  nome_fazenda: string;
  createdAt: Date;
  updatedAt: Date;
  fazendeiro_id_fazendeiro: string;
};
export type CustomerSchemaType = {
  id_consumidor: string;
  nome_consumidor: string;
  email: string;
  numero_telefone: string;
  sexo: Sexo;
  data_nascimento: Date;
  caminho_foto_consumidor: string;
  createdAt: Date;
  localizacao: LocalizacaoType;
};

export type WishListType = {
  id_produto_favorito: string | null;
  produto_id_produto: string;
  consumidor_id_consumidor: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Cart = {
  id_carrinho: string | null;
  produto_id_produto: string;
  consumidor_id_consumidor: string;
  createdAt: Date;
  updatedAt: Date;
};

// Inputs
export type CustomerInputType = {
  nome_consumidor: string;
  email: string;
  senha: string;
  sexo: Sexo;
  caminho_foto_consumidor: string;
  data_nascimento: string | Date;
};


// Input Schema