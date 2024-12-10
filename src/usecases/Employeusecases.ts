import { Employe } from "../domain/entity/Employe"
import { InMemoryEmployeRepository } from "../infastructure/repositories/EmployeRepository"

 class EmployeUsecases{
    constructor(private Employerepo:InMemoryEmployeRepository){

    }
    async createEmploye(body:Employe)
    {
        return this.Employerepo.create(body)
    }
    async FindByEmail(body:Employe){
        return this.Employerepo.findByEmail(body.email)
    }
    async Me(id:number){
        return this.Employerepo.findById(id)
    }
    async FindAll(){
        return this.Employerepo.findAll();
    }
}
 export default EmployeUsecases