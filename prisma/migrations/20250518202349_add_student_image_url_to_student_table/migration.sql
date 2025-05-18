/*
  Warnings:

  - You are about to drop the column `studentImageUrl` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "studentImageUrl";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "studentImageUrl" TEXT NOT NULL DEFAULT '';
