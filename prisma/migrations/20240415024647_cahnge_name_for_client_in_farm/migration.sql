/*
  Warnings:

  - You are about to drop the column `id_client_farm` on the `clientInFarm` table. All the data in the column will be lost.
  - The required column `id_client` was added to the `clientInFarm` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `clientInFarm` DROP COLUMN `id_client_farm`,
    ADD COLUMN `id_client` VARCHAR(191) NOT NULL;
