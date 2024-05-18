type Sexo = "M" | "F";

export type CustomerInputType = {
  nome_consumidor: string;
  email: string;
  numero_telefone: string;
  senha: string;
  sexo: Sexo;
  caminho_foto_consumidor: string;
  data_nascimento: string | Date;
  localizacao: {
      cidade: string;
      provincia: string;
  };
};

export type CustomerSchemaType = {
  id_consumidor: string;
  nome_consumidor: string;
  email: string;
  numero_telefone: string;
  sexo: Sexo;
  data_nascimento: Date;
  caminho_foto_consumidor: string;
  createAt: Date;
  localizacao: {
    provincia: string;
    cidade: string;
  };
  token?: string;
};

export type LocalizacaoInputType = {
    cidade: string;
    provincia: string;
}

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