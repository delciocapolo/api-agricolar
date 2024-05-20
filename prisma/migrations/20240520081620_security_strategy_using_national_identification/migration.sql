/*
  Warnings:

  - A unique constraint covering the columns `[nif_fazenda]` on the table `farm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bi_fazendeiro]` on the table `farmer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nif_fazenda` to the `farm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bi_fazendeiro` to the `farmer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `farm` ADD COLUMN `nif_fazenda` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `farmer` ADD COLUMN `bi_fazendeiro` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `farm_nif_fazenda_key` ON `farm`(`nif_fazenda`);

-- CreateIndex
CREATE UNIQUE INDEX `farmer_bi_fazendeiro_key` ON `farmer`(`bi_fazendeiro`);
