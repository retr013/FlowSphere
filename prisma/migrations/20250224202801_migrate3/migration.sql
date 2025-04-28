/*
  Warnings:

  - You are about to drop the column `priority` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `priority`,
    DROP COLUMN `userId`;

-- DropTable
DROP TABLE `User`;
