import { promises } from "dns";
import { Employe } from "../entity/Employe";
import { LeaveRequest } from "../entity/Leave";

// export interface LeaveInterface{
//   findAll(): Promise<Employe[]>;
//   findById(id: number): Promise<Employe | null>;
//   findByEmail(email:string):Promise<Employe | null>;
//   create(user: Employe): Promise<Employe>;
//   update(user: Employe): Promise<void>;
//   delete(id: number): Promise<void>;
//   updateuser(userdata:Employe | any,id:number):Promise<Employe>;
// }

export interface LeaveRequestInterface{
    CreateLeave(leveRequest:LeaveRequest):Promise<LeaveRequest>
    UpdateStatus(id:number,data:any):Promise<any>
    findAll(): Promise<LeaveRequest[]>;
    findById(id:number): Promise<LeaveRequest[]>
    FindAllPaidLeaves(id:number):Promise<LeaveRequest[]>
    FindRequestById(id:number):Promise<LeaveRequest>
}