-- AlterTable
ALTER TABLE `costumer` MODIFY `role` ENUM('Fazendeiro', 'Consumidor', 'Employee') NOT NULL DEFAULT 'Consumidor';

-- AlterTable
ALTER TABLE `farmer` MODIFY `role` ENUM('Fazendeiro', 'Consumidor', 'Employee') NOT NULL DEFAULT 'Fazendeiro';
