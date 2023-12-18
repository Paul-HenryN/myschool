/*
  Warnings:

  - You are about to drop the column `grade` on the `grade` table. All the data in the column will be lost.
  - Added the required column `value` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `grade` DROP FOREIGN KEY `Grade_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `grade` DROP FOREIGN KEY `Grade_subjectId_fkey`;

-- AlterTable
ALTER TABLE `grade` DROP COLUMN `grade`,
    ADD COLUMN `value` DOUBLE NOT NULL;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
