/*
  Warnings:

  - You are about to drop the column `skincareId` on the `AcneSolution` table. All the data in the column will be lost.
  - You are about to drop the column `acneProblemId` on the `BadIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `GoodIngredient` table. All the data in the column will be lost.
  - You are about to drop the `HabitAndTreatment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[acneProblemId,acneSolutionId]` on the table `AcneProblemSolution` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `AcneSolution` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BadIngredient" DROP CONSTRAINT "BadIngredient_acneProblemId_fkey";

-- DropForeignKey
ALTER TABLE "HabitAndTreatment" DROP CONSTRAINT "HabitAndTreatment_habitId_fkey";

-- DropForeignKey
ALTER TABLE "HabitAndTreatment" DROP CONSTRAINT "HabitAndTreatment_solutionId_fkey";

-- DropForeignKey
ALTER TABLE "HabitAndTreatment" DROP CONSTRAINT "HabitAndTreatment_treatmentId_fkey";

-- AlterTable
ALTER TABLE "AcneSolution" DROP COLUMN "skincareId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BadIngredient" DROP COLUMN "acneProblemId";

-- AlterTable
ALTER TABLE "GoodIngredient" DROP COLUMN "productId";

-- DropTable
DROP TABLE "HabitAndTreatment";

-- CreateTable
CREATE TABLE "_AcneSolutionToBadIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AcneSolutionToBadIngredient_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AcneSolutionToHabit" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AcneSolutionToHabit_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AcneSolutionToTreatment" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AcneSolutionToTreatment_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AcneSolutionToBadIngredient_B_index" ON "_AcneSolutionToBadIngredient"("B");

-- CreateIndex
CREATE INDEX "_AcneSolutionToHabit_B_index" ON "_AcneSolutionToHabit"("B");

-- CreateIndex
CREATE INDEX "_AcneSolutionToTreatment_B_index" ON "_AcneSolutionToTreatment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "AcneProblemSolution_acneProblemId_acneSolutionId_key" ON "AcneProblemSolution"("acneProblemId", "acneSolutionId");

-- AddForeignKey
ALTER TABLE "AcneSolution" ADD CONSTRAINT "AcneSolution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserPublic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcneSolutionToBadIngredient" ADD CONSTRAINT "_AcneSolutionToBadIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "AcneSolution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcneSolutionToBadIngredient" ADD CONSTRAINT "_AcneSolutionToBadIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "BadIngredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcneSolutionToHabit" ADD CONSTRAINT "_AcneSolutionToHabit_A_fkey" FOREIGN KEY ("A") REFERENCES "AcneSolution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcneSolutionToHabit" ADD CONSTRAINT "_AcneSolutionToHabit_B_fkey" FOREIGN KEY ("B") REFERENCES "Habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcneSolutionToTreatment" ADD CONSTRAINT "_AcneSolutionToTreatment_A_fkey" FOREIGN KEY ("A") REFERENCES "AcneSolution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcneSolutionToTreatment" ADD CONSTRAINT "_AcneSolutionToTreatment_B_fkey" FOREIGN KEY ("B") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
