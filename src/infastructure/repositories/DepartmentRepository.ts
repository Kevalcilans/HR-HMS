

import { DepartmentInterface } from "../../domain/entity/Department";
import { DepartmentRepoInterface } from "../../domain/interfaces/Departmentinterface";
import prisma from "../../config/db.config";




export  class InMemoryDepartmentRepository implements DepartmentRepoInterface {
   

    async findAll(): Promise<DepartmentInterface[]> {
        const DepartmentData = await prisma.department.findMany();
        return DepartmentData
    }
    async create(Department: any): Promise<DepartmentInterface> {
      const createDepartment = await prisma.department.create({
        data:Department
      });
      return createDepartment;
    }
    async findByname(name:string):Promise<any>{
      const findDepartmentname = await prisma.department.findUnique({
        where:{
          name:name
      }})
      return findDepartmentname 
    }

 

 
}