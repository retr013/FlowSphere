-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_userId_fkey`;

-- DropIndex
DROP INDEX `Issue_userId_fkey` ON `Issue`;
