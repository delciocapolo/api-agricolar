/*
  Warnings:

  - Added the required column `password` to the `farmer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `farmer` ADD COLUMN `password` VARCHAR(300) NOT NULL;
