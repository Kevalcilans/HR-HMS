import prisma from "../../config/db.config";
import { Employe } from "../../domain/entity/Employe";
import { EmployeInterface } from "../../domain/interfaces/Employeinterface";
import Encryptncryptpassword from "../../helpers/encryptionpassword";



export class InMemoryEmployeRepository implements EmployeInterface {
    
 async findAll(): Promise<Employe[]> {
      const Employee = await prisma.user.findMany({
        include:{
          department:true
        }
      });
      return Employee
  }
  async findById(id: number): Promise<Employe | null> {
    const EmpData = await prisma.user.findUnique({
      where:{
        user_id:id
      }
    })
    return EmpData
  }
  async findByEmail(email: string): Promise<Employe | null> {
    
    const EmpData = await prisma.user.findUnique({
        where:{
          email:email
        }
      })
      return EmpData
  }
 
  async create(user: Employe): Promise<Employe> {
    const encyptPass = Encryptncryptpassword.encrypt(user?.password)
   
    const userData = await prisma.user.create({
        data: {
          ...user,
          password:encyptPass.data.password,
          salt:encyptPass.data.salt
        }
      });
      return userData;
  }
 
  update(user: Employe): Promise<void> {
      throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
      throw new Error("Method not implemented.");
  }
  updateuser(userdata: Employe | any, id: number): Promise<Employe> {
      throw new Error("Method not implemented.");
  }
  private users: Employe[] = [];

 
}