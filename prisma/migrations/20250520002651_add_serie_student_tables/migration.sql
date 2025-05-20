/*
  Warnings:

  - You are about to drop the column `studentName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `studentSerie` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `serie` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `student` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `studentImageUrl` on the `Student` table. All the data in the column will be lost.
  - The `id` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `studentId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serieId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "studentName",
DROP COLUMN "studentSerie",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "serie",
DROP COLUMN "student",
DROP COLUMN "studentImageUrl",
ADD COLUMN     "imageURL" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "serieId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");

-- DropEnum
DROP TYPE "StudentClass";

-- CreateTable
CREATE TABLE "Serie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Serie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Serie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
