-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'employee',
    "departmentId" INTEGER,
    "designation" TEXT,
    "hire_date" TIMESTAMP(3) NOT NULL,
    "leave_balance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "LeaveRequest" (
    "leave_request_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "leave_type_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "leave_days" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isUnpaid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LeaveRequest_pkey" PRIMARY KEY ("leave_request_id")
);

-- CreateTable
CREATE TABLE "UnpaidLeave" (
    "approved_leave_id" SERIAL NOT NULL,
    "leave_request_id" INTEGER NOT NULL,
    "total_days" INTEGER,
    "userId" INTEGER NOT NULL,
    "approved_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remarks" TEXT,
    "isUnpaid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UnpaidLeave_pkey" PRIMARY KEY ("approved_leave_id")
);

-- CreateTable
CREATE TABLE "Department" (
    "department_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "LeaveType" (
    "leave_type_id" SERIAL NOT NULL,
    "leave_type" TEXT NOT NULL,

    CONSTRAINT "LeaveType_pkey" PRIMARY KEY ("leave_type_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_salt_key" ON "User"("salt");

-- CreateIndex
CREATE UNIQUE INDEX "UnpaidLeave_leave_request_id_key" ON "UnpaidLeave"("leave_request_id");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_leave_type_id_fkey" FOREIGN KEY ("leave_type_id") REFERENCES "LeaveType"("leave_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnpaidLeave" ADD CONSTRAINT "UnpaidLeave_leave_request_id_fkey" FOREIGN KEY ("leave_request_id") REFERENCES "LeaveRequest"("leave_request_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnpaidLeave" ADD CONSTRAINT "UnpaidLeave_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
