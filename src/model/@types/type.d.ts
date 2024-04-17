import type { Produto, Categoria, Role } from "@prisma/client";

export declare type CostumerAndProductType = {
  id_consumidor: string;
  id_produto: string;
};
export declare type CostumerAndFarmType = {
  id_consumidor: string;
  id_fazenda: string;
};
export declare type CreateClient = {
  id_consumidor: string;
  id_fazenda: string;
};
export declare type CreateFarmType = {
  id_fazendeiro: string;
  email?: string;
};
export declare type CreateProductType = {
  id_fazenda: string;
  categoria: Categoria;
};
export declare type SellProductType = {
  id_fazenda: string;
  id_produto: string;
};

type EmployeeRoletype =
  | "Admin da Fazenda"
  | "Adicionar Produto"
  | "Criar Stock"
  | "Remover Produto"
  | "Criar Categoria";

export declare type CreateEmployeetype = {
  id_fazenda: string;
  id_consumidor: string;
  privilegio?: Role;
};
