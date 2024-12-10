/*
  Warnings:

  - You are about to drop the column `leave_type_id` on the `LeaveRequest` table. All the data in the column will be lost.
  - You are about to drop the `LeaveType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LeaveRequest" DROP CONSTRAINT "LeaveRequest_leave_type_id_fkey";

-- AlterTable
ALTER TABLE "LeaveRequest" DROP COLUMN "leave_type_id";

-- DropTable
DROP TABLE "LeaveType";
