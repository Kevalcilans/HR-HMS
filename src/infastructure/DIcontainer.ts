
import Departmentusecases from "../usecases/Departmentusecase";
import EmployeUsecases from "../usecases/Employeusecases";
import LeaveRequestuseCases from "../usecases/LeaveRequest";
import { InMemoryDepartmentRepository } from "./repositories/DepartmentRepository";
import { InMemoryEmployeRepository } from "./repositories/EmployeRepository"
import LeaveRequestRepository from "./repositories/LeaveRequestRepository";

export default class DIcontainer{
    private static _EmployeRepository = new InMemoryEmployeRepository()
    private static _LeaveRequest = new LeaveRequestRepository()
    private static _Department = new InMemoryDepartmentRepository()

    static getEmployeRepository(){
        return this._EmployeRepository
    }
    static getAllEmployeUsecase(){
        return new EmployeUsecases(this.getEmployeRepository());
    }
    static getLeaveRequest(){
        return this._LeaveRequest
    }
    static getAllLeaveRequestUsecase(){
        return new LeaveRequestuseCases(this.getLeaveRequest());
    }
    static getAllDepartmentusecases(){
        return  this._Department
    }
    static getAllDepartmentRequestUsecases(){
        return new Departmentusecases(this.getAllDepartmentusecases())
    }
}