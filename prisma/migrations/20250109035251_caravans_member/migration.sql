-- AlterTable
ALTER TABLE "Caravans" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "cpf" TEXT NOT NULL,
    "ward" TEXT NOT NULL,
    "pay" BOOLEAN NOT NULL DEFAULT false,
    "caravansId" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_id_key" ON "Member"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Member_cpf_key" ON "Member"("cpf");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_caravansId_fkey" FOREIGN KEY ("caravansId") REFERENCES "Caravans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
