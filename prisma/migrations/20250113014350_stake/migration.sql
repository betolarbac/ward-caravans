/*
  Warnings:

  - Added the required column `stakeId` to the `Ward` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stakeId" TEXT;

-- AlterTable
ALTER TABLE "Ward" ADD COLUMN     "stakeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Stake" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stake_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stake_id_key" ON "Stake"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_stakeId_fkey" FOREIGN KEY ("stakeId") REFERENCES "Stake"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ward" ADD CONSTRAINT "Ward_stakeId_fkey" FOREIGN KEY ("stakeId") REFERENCES "Stake"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
