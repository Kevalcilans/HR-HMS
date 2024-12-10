import prisma from "../../config/db.config";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../helpers/responces";
import { CustomError } from "../../helpers/customeerror";
import { ErrorCodes } from "../../constent/code";

export default class CountEmployeeData {
  async CountData(req: Request, resp: Response, next: NextFunction) {
   //@ts-ignore
    const _id = req.user.userId;

    try {
      const availableLeaves = await prisma.user.findUnique({
        select: {
          leave_balance: true,
        },
        where: {
          user_id: _id,
        },
      });

     
      const paidLeaves = await prisma.leaveRequest.aggregate({
        _sum: {
          leave_days: true,
        },
        where: {
          user_id: _id,
        },
      });

     
      const unpaidLeave = await prisma.unpaidLeave.aggregate({
        _sum: {
          total_days: true,
        },
        where: {
          userId: _id,
        },
      });

      const employee = await prisma.user.count()

     
      successResponse(resp, 'GetAllDepartment Successfully', {
        availableLeaves: availableLeaves?.leave_balance ?? 0,
        paidLeaves: paidLeaves._sum.leave_days ?? 0,
        unpaidLeave: unpaidLeave._sum.total_days ?? 0,
        employess: employee ?? 0
      });

    } catch (error) {
      
      let customError: CustomError;
      customError = new CustomError('An unexpected error occurred', 500, ErrorCodes.BAD_REQUEST);

      if (next) {
        next(customError);
      } else {
        resp.status(customError.statusCode).json(customError.getDetails());
      }
    }
  }
}
