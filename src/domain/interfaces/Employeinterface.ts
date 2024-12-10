import { Employe } from "../entity/Employe";

export interface EmployeInterface{
  findAll(): Promise<Employe[]>;
  findById(id: number): Promise<Employe | null>;
  findByEmail(email:string):Promise<Employe | null>;
  create(user: Employe): Promise<Employe>;
  update(user: Employe): Promise<void>;
  delete(id: number): Promise<void>;
  updateuser(userdata:Employe | any,id:number):Promise<Employe>;
}