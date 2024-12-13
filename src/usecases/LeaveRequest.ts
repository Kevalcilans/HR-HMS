import { LeaveRequest } from "../domain/entity/Leave";
import LeaveRequestRepository from "../infastructure/repositories/LeaveRequestRepository";

class LeaveRequestuseCases {
    constructor(private Employerepo:LeaveRequestRepository){

    }
    async createLeaveRequest(body:LeaveRequest){
        return await  this.Employerepo.CreateLeave(body)
    }
    async updateLeadStatus(id:number,body:any){
        return await this.Employerepo.UpdateStatus(id,body)
    }
    async FindAllLeads(){
        return this.Employerepo.findAll();
    }
    async FindById(id:number){
        return this.Employerepo.findById(id)
    }
    async DispalyallpaidLeave(id:number)
    {
        return this.Employerepo.FindAllPaidLeaves(id)
    }
    async FindByRequestId(id:number)
    {
        return this.Employerepo.FindRequestById(id)
    }
    async FindunpaidByRequestId(id:number)
    {
        return this.Employerepo.Findunipaidleavebyid(id);
    }
}
export default LeaveRequestuseCases