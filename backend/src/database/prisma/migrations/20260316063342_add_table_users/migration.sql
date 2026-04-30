-- CreateTable
CREATE TABLE "UserPublic" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "passwordHash" TEXT NOT NULL,
    "refreshTokenHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPublic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPublic_email_key" ON "UserPublic"("email");
