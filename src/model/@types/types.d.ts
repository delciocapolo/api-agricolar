export type Sexo = "M" | "F";

export type Fazendeiro = {
    id_fazendeiro: string;
    nome_fazendeiro: string;
    email: string;
    quantidade_fazendas: number;
    sexo: Sexo;
    data_nascimento: Date;
    caminho_foto_fazendeiro: string | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    localizacao_id_localizacao: string;
}

export type Localizacao = {
    id_localizacao: string;
    provincia: string;
    cidade: string;
    createdAt: Date;
}

export type Fazenda = {
    id_fazenda: string;
    nome_fazenda: string;
    createdAt: Date;
    updatedAt: Date;
    fazendeiro_id_fazendeiro: string;
}

export type Produto = {
    id_produto: string;
    nome_produto: string;
    preco_produto: number;
    categoria_id_categoria: number;
    caminho_foto_produto: string;
    descricao: string | null;
    servico_entrega_disponivel: boolean | null;
    disponivel: boolean | null;
    fazenda_id_fazenda: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Categoria = {
    id_categoria: number;
    nome_categoria: string;
    createdAt: Date;
}

export type Role = "Fazendeiro" | "Consumidor" | "Employee";

export type Consumidor = {
    id_consumidor: string
    nome_consumidor: string
    email: string
    numero_telefone: string
    senha: string
    sexo: Sexo
    data_nascimento: Date
    caminho_foto_consumidor: string | null
    numero_compras: number | null
    role: Role
    createdAt: Date
    updatedAt: Date
    localizacao_id_localizacao: string
}