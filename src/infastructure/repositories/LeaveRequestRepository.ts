import prisma from "../../config/db.config";
import { LeaveRequest } from "../../domain/entity/Leave";
import { LeaveRequestInterface } from "../../domain/interfaces/CreateLeaveRequest";
import countLeaveDays from "../../helpers/calculatedays";

class LeaveRequestRepository implements LeaveRequestInterface{
    async FindRequestById(id: number): Promise<any> {
       try{
        const findById = await prisma.leaveRequest.findUnique({
            where:{
                leave_request_id:id
            },
            include:{
                user:{
                    select:{
                        first_name:true,
                        last_name:true
                    }
                }
            }
        })
        return findById
       }
       catch (error) {
        console.error('Error fetching leads by ID:', error);
        throw new Error('Error fetching leads');
      }
    }

    async FindAllPaidLeaves(id: number): Promise<any> {
        try{
            const findLeaveById = await prisma.unpaidLeave.findMany({
                where:{
                    userId:id
                },
                include:{
                    leaveRequest:{
                        include:{
                            user:{
                                select:{
                                    first_name:true,
                                    last_name:true
                                }
                            }
                        }
                    }
                }
            })
            return findLeaveById
          }
          catch (error) {
            console.error('Error fetching leads by ID:', error);
            throw new Error('Error fetching leads');
          }
    }

    //for unpaid levve find details by employe id
    async Findunipaidleavebyid(id:number): Promise<any>{
        try{
            const findLeaveById = await prisma.unpaidLeave.findMany({
                include:{
                    leaveRequest:{
                        include:{
                            user:{
                                select:{
                                    first_name:true,
                                    last_name:true
                                }
                            }
                        }
                    }
                },
                where:{
                    userId:id
                }
            })
            return findLeaveById
          }
          catch (error) {
            console.error('Error fetching leads by ID:', error);
            throw new Error('Error fetching leads');
          }
    }

    async findById(Id: number): Promise<LeaveRequest[]> {
      try{
        const findLeaveById = await prisma.leaveRequest.findMany({
            include:{
                user:true
            },
            where:{
                user_id:Id
            }
        })
        return findLeaveById
      }
      catch (error) {
        console.error('Error fetching leads by ID:', error);
        throw new Error('Error fetching leads');
      }
    }
    async findAll(): Promise<LeaveRequest[]> {
        try {
            const LeaveData = await prisma.leaveRequest.findMany({
                include:{
                    user:true
                }
            });
            return LeaveData;
        } catch (error) {
            console.error('Error fetching leads by ID:', error);
            throw new Error('Error fetching leads');
        }
    }
    async UpdateStatus(Id: number, data: any): Promise<any> {
        try {
            const LeaveData = await prisma.leaveRequest.update({
                where: {
                    leave_request_id: Id
                },
                data:{
                    status:data
                }
            });
            
            return LeaveData;
        } catch (error) {
            console.error('Error fetching leads by ID:', error);
            throw new Error('Error fetching leads');
        }
        
    }
    async CreateLeave(Data:LeaveRequest): Promise<LeaveRequest> {
        const LeaveData = await prisma.leaveRequest.create({
            data: {
                ...Data,
                leave_days:countLeaveDays(Data.start_date,Data.end_date)
            },
            include:{
                user:true
            }
          });
          console.log("leaveData")
          return LeaveData;
    }
    

}

export default LeaveRequestRepository