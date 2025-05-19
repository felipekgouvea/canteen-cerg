/*
  Warnings:

  - You are about to drop the column `studentId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `studentName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentSerie` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_studentId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "studentId",
ADD COLUMN     "studentName" TEXT NOT NULL,
ADD COLUMN     "studentSerie" TEXT NOT NULL;
