-- CreateTable
CREATE TABLE "JadwalTreatment" (
    "id" SERIAL NOT NULL,
    "hari" TIMESTAMP(3) NOT NULL,
    "tempat" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "pengingat" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JadwalTreatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JadwalHabit" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "hari" TEXT NOT NULL,
    "jam" TEXT NOT NULL,
    "pengingat" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JadwalHabit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JadwalTreatmentToUserPublic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_JadwalTreatmentToUserPublic_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_JadwalHabitToUserPublic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_JadwalHabitToUserPublic_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_JadwalTreatmentToUserPublic_B_index" ON "_JadwalTreatmentToUserPublic"("B");

-- CreateIndex
CREATE INDEX "_JadwalHabitToUserPublic_B_index" ON "_JadwalHabitToUserPublic"("B");

-- AddForeignKey
ALTER TABLE "_JadwalTreatmentToUserPublic" ADD CONSTRAINT "_JadwalTreatmentToUserPublic_A_fkey" FOREIGN KEY ("A") REFERENCES "JadwalTreatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JadwalTreatmentToUserPublic" ADD CONSTRAINT "_JadwalTreatmentToUserPublic_B_fkey" FOREIGN KEY ("B") REFERENCES "UserPublic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JadwalHabitToUserPublic" ADD CONSTRAINT "_JadwalHabitToUserPublic_A_fkey" FOREIGN KEY ("A") REFERENCES "JadwalHabit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JadwalHabitToUserPublic" ADD CONSTRAINT "_JadwalHabitToUserPublic_B_fkey" FOREIGN KEY ("B") REFERENCES "UserPublic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
