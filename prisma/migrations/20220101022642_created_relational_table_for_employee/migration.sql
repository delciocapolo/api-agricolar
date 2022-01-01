/*
  Warnings:

  - Added the required column `role` to the `costumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `farmer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `costumer` ADD COLUMN `role` ENUM('Fazendeiro', 'Consumidor', 'Employee') NOT NULL;

-- AlterTable
ALTER TABLE `farmer` ADD COLUMN `role` ENUM('Fazendeiro', 'Consumidor', 'Employee') NOT NULL;

-- CreateTable
CREATE TABLE `employee` (
    `id_employee` VARCHAR(191) NOT NULL,
    `entidade_id_fazenda` VARCHAR(191) NOT NULL,
    `empregado_id_consumidor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_employee`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_entidade_id_fazenda_fkey` FOREIGN KEY (`entidade_id_fazenda`) REFERENCES `farm`(`id_farm`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_empregado_id_consumidor_fkey` FOREIGN KEY (`empregado_id_consumidor`) REFERENCES `costumer`(`id_costumer`) ON DELETE RESTRICT ON UPDATE CASCADE;
