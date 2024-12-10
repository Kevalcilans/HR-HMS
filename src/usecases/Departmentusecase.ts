import { Employe } from "../domain/entity/Employe"
import { InMemoryDepartmentRepository } from "../infastructure/repositories/DepartmentRepository"


 class Departmentusecases{
    constructor(private departmentrepo:InMemoryDepartmentRepository){

    }
   async findAll(){
    return this.departmentrepo.findAll()
   }
   async Create(Data:any)
   {
    return this.departmentrepo.create(Data)
   }
   async FindByname(Departmentname:any)
   {
      return this.departmentrepo.findByname(Departmentname)
   }
}
 export default Departmentusecases