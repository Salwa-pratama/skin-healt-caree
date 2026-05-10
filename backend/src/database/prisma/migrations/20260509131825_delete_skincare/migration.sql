/*
  Warnings:

  - You are about to drop the `ProductSkincare` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AcneSolution" DROP CONSTRAINT "AcneSolution_skincareId_fkey";

-- DropForeignKey
ALTER TABLE "GoodIngredient" DROP CONSTRAINT "GoodIngredient_productId_fkey";

-- AlterTable
ALTER TABLE "AcneProblem" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "predictions" JSONB;

-- DropTable
DROP TABLE "ProductSkincare";

-- CreateTable
CREATE TABLE "_AcneSolutionToGoodIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AcneSolutionToGoodIngredient_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AcneSolutionToGoodIngredient_B_index" ON "_AcneSolutionToGoodIngredient"("B");

-- AddForeignKey
ALTER TABLE "_AcneSolutionToGoodIngredient" ADD CONSTRAINT "_AcneSolutionToGoodIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "AcneSolution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcneSolutionToGoodIngredient" ADD CONSTRAINT "_AcneSolutionToGoodIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "GoodIngredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
