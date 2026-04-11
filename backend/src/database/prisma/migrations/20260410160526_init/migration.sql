-- CreateTable
CREATE TABLE "AcneProblem" (
    "id" SERIAL NOT NULL,
    "citra" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AcneProblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcneSolution" (
    "id" SERIAL NOT NULL,
    "skincareId" INTEGER NOT NULL,

    CONSTRAINT "AcneSolution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Treatment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabitAndTreatment" (
    "id" SERIAL NOT NULL,
    "habitId" INTEGER NOT NULL,
    "treatmentId" INTEGER NOT NULL,
    "solutionId" INTEGER NOT NULL,

    CONSTRAINT "HabitAndTreatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcneProblemSolution" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "acneSolutionId" INTEGER NOT NULL,
    "acneProblemId" INTEGER NOT NULL,

    CONSTRAINT "AcneProblemSolution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSkincare" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,

    CONSTRAINT "ProductSkincare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodIngredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "GoodIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BadIngredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "acneProblemId" INTEGER NOT NULL,

    CONSTRAINT "BadIngredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AcneProblem" ADD CONSTRAINT "AcneProblem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserPublic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcneSolution" ADD CONSTRAINT "AcneSolution_skincareId_fkey" FOREIGN KEY ("skincareId") REFERENCES "ProductSkincare"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitAndTreatment" ADD CONSTRAINT "HabitAndTreatment_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitAndTreatment" ADD CONSTRAINT "HabitAndTreatment_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitAndTreatment" ADD CONSTRAINT "HabitAndTreatment_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "AcneSolution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcneProblemSolution" ADD CONSTRAINT "AcneProblemSolution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserPublic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcneProblemSolution" ADD CONSTRAINT "AcneProblemSolution_acneSolutionId_fkey" FOREIGN KEY ("acneSolutionId") REFERENCES "AcneSolution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcneProblemSolution" ADD CONSTRAINT "AcneProblemSolution_acneProblemId_fkey" FOREIGN KEY ("acneProblemId") REFERENCES "AcneProblem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodIngredient" ADD CONSTRAINT "GoodIngredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ProductSkincare"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadIngredient" ADD CONSTRAINT "BadIngredient_acneProblemId_fkey" FOREIGN KEY ("acneProblemId") REFERENCES "AcneProblem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
