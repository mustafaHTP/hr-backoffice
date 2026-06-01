-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "titleId" INTEGER;

-- CreateTable
CREATE TABLE "EmployeeTitle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmployeeTitle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeTitle_name_key" ON "EmployeeTitle"("name");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "EmployeeTitle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
