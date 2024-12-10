import prisma from "../../config/db.config";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../helpers/responces";
import { CustomError } from "../../helpers/customeerror";
import { ErrorCodes } from "../../constent/code";

export default class CountAdminData {
  async CountData(req: Request, resp: Response, next: NextFunction) {
   //@ts-ignore
    const _id = req.user.userId;

    try {
      const CountEmployes = await prisma.user.count();
      console.log(CountEmployes)

      const CountDepartment = await prisma.department.count()
      console.log(CountDepartment)

      const pendingRequest = await prisma.leaveRequest.count({
        where:{
            status:"pending"
        }
      })
      console.log(pendingRequest)
      successResponse(resp, 'GetAllDepartment Successfully', {
       "CountEmployes":CountEmployes,
       "CountDepartment":CountDepartment,
       "pendingRequest":pendingRequest
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
