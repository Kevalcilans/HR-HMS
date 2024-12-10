import express, { Express, Request, Response, NextFunction } from "express";
import DIcontainer from "../../infastructure/DIcontainer";
import { CustomError } from "../../helpers/customeerror";
import { ErrorCodes } from "../../constent/code";
import { errorResponse, successResponse } from "../../helpers/responces";
import Encryptncryptpassword from "../../helpers/encryptionpassword";
import Jwttoken from "../../helpers/jwtToken";
import _ from 'lodash'


class EmployeeController{
    private Employe = DIcontainer.getAllEmployeUsecase()

    public async CreateEmploye(req:Request,resp:Response,next?:NextFunction)
    {

        try {
            const existingUser = await this.Employe.FindByEmail(req.body);
            if (existingUser) {
              return errorResponse(resp, 'Email address already exists', [], 400);
            }
            const Employee = await this.Employe.createEmploye(req.body)
            successResponse(resp, 'User created successfully');
            
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
    public async Login(req: Request, resp: Response, next?: NextFunction) {

        try{
         const userdata = await this.Employe.FindByEmail(req.body)
         if (!userdata) {
           errorResponse(resp,"user is not found",404)
           return;
         }
         const dycryptpass = Encryptncryptpassword.dycrypt(req.body.password, userdata.password, userdata.salt)
     
         if (dycryptpass) {
           const jwttoken = Jwttoken.createJwt({ userId: userdata?.user_id,Role: userdata.role }, "b1f3d9e8234c57f8a0d2e4a5c6b7e8f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7", {
             expiresIn: '1h',
           })
           successResponse(resp,"Login sucessfully",_.omit({
             ...userdata,
             token: jwttoken
           }, ["password", "salt"]))
           return true;
         } else {
           /* resp.send('Authentication failed'); */
           errorResponse(resp, "user doesn't exit", 404);
           return false
         }
     
        }
        catch (err: any) {
         if (err.name === 'ValidationError') {
        //    const formattedErrors = handleYupError(err);
        //    return errorResponse(resp, 'Validation failed', formattedErrors, 400);
        return errorResponse(resp, 'Validation failed', "validation error", 400);
         }
         else if (err instanceof CustomError) {
           return errorResponse(resp, err.message, [{ message: err.message }], err.statusCode);
         }
         else if (err instanceof Error) {
           const customError = new CustomError(err.message, 500, ErrorCodes.INTERNAL_SERVER_ERROR);
           return errorResponse(resp, 'An unexpected error occurred', [{ message: customError.message }], customError.statusCode);
         }
         else {
           const customError = new CustomError('Unknown error occurred', 500, ErrorCodes.INTERNAL_SERVER_ERROR);
           return errorResponse(resp, 'An unexpected error occurred', [{ message: customError.message }], customError.statusCode);
         }
       }
        
        
        
       }
    public async Me(req:Request,resp:Response,next:NextFunction)
    {
      //@ts-ignore
      const _id = req.user.userId;
      try {
        const existingUser = await this.Employe.Me(_id);
        successResponse(resp, 'user found successfully', _.omit(existingUser,['password','salt']));
        
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
    public async Alluser(req:Request,resp:Response,next:NextFunction)
    {
      try{
        const findAllEmp = await this.Employe.FindAll();
        successResponse(resp, 'user found successfully', findAllEmp.map(emp => _.omit(emp, ['password', 'salt'])));
      }
      catch (error) {
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

export default EmployeeController