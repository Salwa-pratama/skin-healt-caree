/*
  Warnings:

  - The primary key for the `JadwalHabit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `JadwalTreatment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_JadwalHabitToUserPublic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_JadwalTreatmentToUserPublic` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_JadwalHabitToUserPublic" DROP CONSTRAINT "_JadwalHabitToUserPublic_A_fkey";

-- DropForeignKey
ALTER TABLE "_JadwalTreatmentToUserPublic" DROP CONSTRAINT "_JadwalTreatmentToUserPublic_A_fkey";

-- AlterTable
ALTER TABLE "JadwalHabit" DROP CONSTRAINT "JadwalHabit_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "JadwalHabit_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "JadwalHabit_id_seq";

-- AlterTable
ALTER TABLE "JadwalTreatment" DROP CONSTRAINT "JadwalTreatment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "JadwalTreatment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "JadwalTreatment_id_seq";

-- AlterTable
ALTER TABLE "UserPublic" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "_JadwalHabitToUserPublic" DROP CONSTRAINT "_JadwalHabitToUserPublic_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_JadwalHabitToUserPublic_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "_JadwalTreatmentToUserPublic" DROP CONSTRAINT "_JadwalTreatmentToUserPublic_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_JadwalTreatmentToUserPublic_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "_JadwalTreatmentToUserPublic" ADD CONSTRAINT "_JadwalTreatmentToUserPublic_A_fkey" FOREIGN KEY ("A") REFERENCES "JadwalTreatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JadwalHabitToUserPublic" ADD CONSTRAINT "_JadwalHabitToUserPublic_A_fkey" FOREIGN KEY ("A") REFERENCES "JadwalHabit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
