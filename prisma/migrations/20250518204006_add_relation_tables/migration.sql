/*
  Warnings:

  - You are about to drop the column `studentClass` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `studentName` on the `Order` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "studentClass",
DROP COLUMN "studentName",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
