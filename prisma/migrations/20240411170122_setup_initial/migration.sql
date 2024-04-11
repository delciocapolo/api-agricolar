-- CreateTable
CREATE TABLE `farmer` (
    `id_farmer` VARCHAR(100) NOT NULL,
    `farmer_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `count_farmer` SMALLINT NOT NULL DEFAULT 1,
    `sex` ENUM('F', 'M') NOT NULL,
    `born_on` DATE NOT NULL,
    `caminho_foto_fazendeiro` VARCHAR(350) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `location_id_location` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `farmer_email_key`(`email`),
    UNIQUE INDEX `farmer_location_id_location_key`(`location_id_location`),
    PRIMARY KEY (`id_farmer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `id_localizacao` VARCHAR(191) NOT NULL,
    `provincia` VARCHAR(150) NOT NULL,
    `cidade` VARCHAR(150) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_localizacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `socialmedia` (
    `id_socialmedia` VARCHAR(191) NOT NULL,
    `nome_redesocial` VARCHAR(50) NOT NULL,
    `url_socialmedia` VARCHAR(150) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fazendeiro_id_fazendeiro` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `socialmedia_url_socialmedia_key`(`url_socialmedia`),
    PRIMARY KEY (`id_socialmedia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `farm` (
    `id_farm` VARCHAR(191) NOT NULL,
    `farm_name` VARCHAR(250) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fazendeiro_id_fazendeiro` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `farm_farm_name_key`(`farm_name`),
    PRIMARY KEY (`id_farm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock` (
    `id_stock` VARCHAR(191) NOT NULL,
    `product_stock_name` VARCHAR(250) NOT NULL,
    `count_available` SMALLINT NULL DEFAULT 0,
    `count_stock` SMALLINT NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fazenda_id_fazenda` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_stock`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id_category` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_categoria` VARCHAR(250) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `category_nome_categoria_key`(`nome_categoria`),
    PRIMARY KEY (`id_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id_product` VARCHAR(191) NOT NULL,
    `product_name` VARCHAR(250) NOT NULL,
    `preco_produto` FLOAT NOT NULL,
    `categoria_id_categoria` INTEGER NOT NULL,
    `photo_product` VARCHAR(350) NOT NULL,
    `description` MEDIUMTEXT NULL,
    `delivery_service_available` BOOLEAN NULL DEFAULT false,
    `disponivel` BOOLEAN NULL DEFAULT true,
    `fazenda_id_fazenda` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `product_product_name_key`(`product_name`),
    PRIMARY KEY (`id_product`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `costumer` (
    `id_costumer` VARCHAR(300) NOT NULL,
    `costumer_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `numero_telefone` VARCHAR(15) NOT NULL,
    `password` VARCHAR(300) NOT NULL,
    `sex` ENUM('F', 'M') NOT NULL,
    `born_on` DATE NOT NULL,
    `path_photo` VARCHAR(250) NULL,
    `count_purchases` MEDIUMINT UNSIGNED NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `location_id_location` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `costumer_email_key`(`email`),
    UNIQUE INDEX `costumer_location_id_location_key`(`location_id_location`),
    PRIMARY KEY (`id_costumer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monitoring` (
    `id_monitoring` VARCHAR(300) NOT NULL,
    `product_id_product` VARCHAR(191) NOT NULL,
    `costumer_id_costumer` VARCHAR(191) NOT NULL,
    `farm_id_farm` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_monitoring`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart` (
    `id_cart` VARCHAR(300) NULL,
    `product_id_product` VARCHAR(191) NOT NULL,
    `costumer_id_costumer` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`product_id_product`, `costumer_id_costumer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FavoriteProduct` (
    `id_produto_favorito` VARCHAR(300) NULL,
    `product_id_product` VARCHAR(191) NOT NULL,
    `costumer_id_costumer` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`product_id_product`, `costumer_id_costumer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FavoriteFarm` (
    `id_favorite_farm` VARCHAR(300) NULL,
    `costumer_id_costumer` VARCHAR(191) NOT NULL,
    `farm_id_farm` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`costumer_id_costumer`, `farm_id_farm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `farmer` ADD CONSTRAINT `farmer_location_id_location_fkey` FOREIGN KEY (`location_id_location`) REFERENCES `location`(`id_localizacao`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `socialmedia` ADD CONSTRAINT `socialmedia_fazendeiro_id_fazendeiro_fkey` FOREIGN KEY (`fazendeiro_id_fazendeiro`) REFERENCES `farmer`(`id_farmer`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `farm` ADD CONSTRAINT `farm_fazendeiro_id_fazendeiro_fkey` FOREIGN KEY (`fazendeiro_id_fazendeiro`) REFERENCES `farmer`(`id_farmer`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `stock_fazenda_id_fazenda_fkey` FOREIGN KEY (`fazenda_id_fazenda`) REFERENCES `farm`(`id_farm`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_categoria_id_categoria_fkey` FOREIGN KEY (`categoria_id_categoria`) REFERENCES `category`(`id_category`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_fazenda_id_fazenda_fkey` FOREIGN KEY (`fazenda_id_fazenda`) REFERENCES `farm`(`id_farm`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `costumer` ADD CONSTRAINT `costumer_location_id_location_fkey` FOREIGN KEY (`location_id_location`) REFERENCES `location`(`id_localizacao`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monitoring` ADD CONSTRAINT `monitoring_product_id_product_fkey` FOREIGN KEY (`product_id_product`) REFERENCES `product`(`id_product`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monitoring` ADD CONSTRAINT `monitoring_costumer_id_costumer_fkey` FOREIGN KEY (`costumer_id_costumer`) REFERENCES `costumer`(`id_costumer`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monitoring` ADD CONSTRAINT `monitoring_farm_id_farm_fkey` FOREIGN KEY (`farm_id_farm`) REFERENCES `farm`(`id_farm`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_product_id_product_fkey` FOREIGN KEY (`product_id_product`) REFERENCES `product`(`id_product`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_costumer_id_costumer_fkey` FOREIGN KEY (`costumer_id_costumer`) REFERENCES `costumer`(`id_costumer`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteProduct` ADD CONSTRAINT `FavoriteProduct_product_id_product_fkey` FOREIGN KEY (`product_id_product`) REFERENCES `product`(`id_product`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteProduct` ADD CONSTRAINT `FavoriteProduct_costumer_id_costumer_fkey` FOREIGN KEY (`costumer_id_costumer`) REFERENCES `costumer`(`id_costumer`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteFarm` ADD CONSTRAINT `FavoriteFarm_costumer_id_costumer_fkey` FOREIGN KEY (`costumer_id_costumer`) REFERENCES `costumer`(`id_costumer`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteFarm` ADD CONSTRAINT `FavoriteFarm_farm_id_farm_fkey` FOREIGN KEY (`farm_id_farm`) REFERENCES `farm`(`id_farm`) ON DELETE RESTRICT ON UPDATE CASCADE;
