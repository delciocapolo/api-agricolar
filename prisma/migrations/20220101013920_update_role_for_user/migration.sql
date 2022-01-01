-- AlterTable
ALTER TABLE `costumer` ADD COLUMN `role` ENUM('Fazendeiro', 'Consumidor', 'Employee') NULL DEFAULT 'Consumidor';

-- AlterTable
ALTER TABLE `farmer` ADD COLUMN `role` ENUM('Fazendeiro', 'Consumidor', 'Employee') NULL DEFAULT 'Fazendeiro';
