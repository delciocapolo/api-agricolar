import { Sexo } from "@prisma/client";

type localizacao = {
    cidade: string;
    provincia: string;
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
        localizacao: localizacao;
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
    localizacao: localizacao;
    createdAt: Date;
}

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