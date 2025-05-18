/*
  Warnings:

  - Added the required column `studentClass` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "studentClass" TEXT NOT NULL,
ADD COLUMN     "studentName" TEXT NOT NULL;
