-- DropForeignKey
ALTER TABLE "AcneSolution" DROP CONSTRAINT "AcneSolution_userId_fkey";

-- AlterTable
ALTER TABLE "AcneSolution" ADD COLUMN     "description" TEXT,
ADD COLUMN     "type" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AcneSolution" ADD CONSTRAINT "AcneSolution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserPublic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
