import { ErrorCodes } from "../../constent/code";
import { CustomError } from "../../helpers/customeerror";
import { errorResponse, successResponse } from "../../helpers/responces";
import DIcontainer from "../../infastructure/DIcontainer";
import { Request,Response,NextFunction } from "express";

class DepartmentController{
private department =  DIcontainer.getAllDepartmentRequestUsecases();

public async CreateDepartment(req:Request,resp:Response,next?:NextFunction)
{
    try {
      console.log("hello this is a request body")
      console.log(req.body)
        const existingUser = await this.department.FindByname(req.body.name)
        if (existingUser) {
          return errorResponse(resp, 'This department is already avilable', [], 400);
        }
        const Employee = await this.department.Create(req.body)
        successResponse(resp, 'Department created successfully', Employee);
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

public async GetAllDepartment(req:Request,resp:Response,next:NextFunction){
  try {
    const Department = await this.department.findAll()
    console.log("hello")
    console.log(Department)
    successResponse(resp, 'GetAll department Sucessfully', Department);
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

export default DepartmentController