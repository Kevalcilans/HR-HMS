import { Router,Request,Response,NextFunction } from "express";
import EmployeeController from "../controller/EmployeController";
import LeaveRequestRepository from "../../infastructure/repositories/LeaveRequestRepository";
import LeaveRequestController from "../controller/LeaveRRequestController";
import MailController from "../controller/sendMail";
import verifyToken from "../middleware/auth";
import UpdatesLeaves from "../controller/UpdateLeaves";
import DepartmentController from "../controller/DepartmentController";
import adminverifyToken from "../middleware/adminauth";
import CountEmployeData from "../controller/CountDataCOntroller";
import CountAdminData from "../controller/CountAdminDataController";


const route = Router();

const Employecontroller = new EmployeeController();
const LeaveRequestcontroller = new LeaveRequestController();
const mailController = new MailController()
const countleaves = new UpdatesLeaves()
const department = new DepartmentController()
const count = new CountEmployeData()
const admincount = new CountAdminData()

route.get("/getallemp",(req:Request,resp:Response,next:NextFunction)=>{
    resp.send(
        "first route created sucessfully"
    )

})

route.post("/signup",(req:Request,resp:Response,next:NextFunction)=>Employecontroller.CreateEmploye(req,resp,next))
route.post("/login",(req:Request,resp:Response,next:NextFunction)=>Employecontroller.Login(req,resp,next))
route.post("/LeaveRequest",verifyToken,(req:Request,resp:Response,next:NextFunction)=>LeaveRequestcontroller.CreateLeaveRequest(req,resp,next))
route.get("/finduserReqquest",verifyToken,(req:Request,resp:Response,next:NextFunction)=>LeaveRequestcontroller.FindById(req,resp,next))
route.post("/sendmail",(req:Request,resp:Response,next:NextFunction)=>mailController.sendEmail(req,resp,next))
route.put("/approvedleave/:id",verifyToken,(req:Request,resp:Response,next:NextFunction)=>LeaveRequestcontroller.UpdateStatus(req,resp,next))
route.put("/countleaves",verifyToken,(req:Request,resp:Response,next:NextFunction)=>countleaves.updateCount(req,resp,next))
route.get("/me",verifyToken,(req:Request,resp:Response,next:NextFunction)=>Employecontroller.Me(req,resp,next))
route.get("/allLeaves",(req:Request,resp:Response,next:NextFunction)=>LeaveRequestcontroller.AllRequest(req,resp,next))
route.get("/allDepartment",verifyToken,(req:Request,resp:Response,next:NextFunction)=>department.GetAllDepartment(req,resp,next))
route.post("/createDeprtment",adminverifyToken,(req:Request,resp:Response,next:NextFunction)=>department.CreateDepartment(req,resp,next))
route.get("/countuserdata",verifyToken,(req:Request,resp:Response,next:NextFunction)=>count.CountData(req,resp,next))
route.get("/findAllEmp",adminverifyToken,(req:Request,resp:Response,next:NextFunction)=>Employecontroller.Alluser(req,resp,next))
route.get("/countadmin",adminverifyToken,(req:Request,resp:Response,next:NextFunction)=>admincount.CountData(req,resp,next))
route.get("/displayallpaidleave",verifyToken,(req:Request,resp:Response,next:NextFunction)=>LeaveRequestcontroller.FindALLPaidLeave(req,resp,next))
route.get("/Leaves/:id",verifyToken,(req:Request,resp:Response,next:NextFunction)=>LeaveRequestcontroller.findRequestByid(req,resp,next))
route.get("/adminpaidLeaves/:id",adminverifyToken,(req:Request,resp:Response,next:NextFunction)=>LeaveRequestcontroller.findempbyadmin(req,resp,next))
route.get("/adminunpaidLeaves/:id",adminverifyToken,(req:Request,resp:Response,next:NextFunction)=>LeaveRequestcontroller.GetunpaidLeaveById(req,resp,next))

export default route