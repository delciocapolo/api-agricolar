/*
  Warnings:

  - Changed the type of `born_on` on the `costumer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `born_on` on the `farmer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `costumer` DROP COLUMN `born_on`,
    ADD COLUMN `born_on` MEDIUMINT NOT NULL;

-- AlterTable
ALTER TABLE `farmer` DROP COLUMN `born_on`,
    ADD COLUMN `born_on` MEDIUMINT NOT NULL;
