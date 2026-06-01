/*
  Warnings:

  - You are about to drop the column `dayLimit` on the `LeaveType` table. All the data in the column will be lost.
  - You are about to drop the column `hasLimit` on the `LeaveType` table. All the data in the column will be lost.
  - Made the column `totalDays` on table `LeaveRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "LimitScope" AS ENUM ('NONE', 'PER_REQUEST', 'PER_PERIOD');

-- CreateEnum
CREATE TYPE "PeriodType" AS ENUM ('WEEKLY', 'MONTHLY', 'YEARLY');

-- AlterTable
ALTER TABLE "LeaveRequest" ALTER COLUMN "totalDays" SET NOT NULL;

-- AlterTable
ALTER TABLE "LeaveType" DROP COLUMN "dayLimit",
DROP COLUMN "hasLimit",
ADD COLUMN     "limitScope" "LimitScope" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "perRequestMaxDays" INTEGER,
ADD COLUMN     "periodMaxDays" INTEGER,
ADD COLUMN     "periodQuantity" INTEGER,
ADD COLUMN     "periodType" "PeriodType";
