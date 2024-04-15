-- CreateTable
CREATE TABLE `clientInFarm` (
    `id_client_farm` VARCHAR(191) NOT NULL,
    `farm_id_farm` VARCHAR(191) NOT NULL,
    `costumer_id_costumer` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`farm_id_farm`, `costumer_id_costumer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `clientInFarm` ADD CONSTRAINT `clientInFarm_farm_id_farm_fkey` FOREIGN KEY (`farm_id_farm`) REFERENCES `farm`(`id_farm`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clientInFarm` ADD CONSTRAINT `clientInFarm_costumer_id_costumer_fkey` FOREIGN KEY (`costumer_id_costumer`) REFERENCES `costumer`(`id_costumer`) ON DELETE RESTRICT ON UPDATE CASCADE;
