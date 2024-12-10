import { Department } from "@prisma/client";
import { DepartmentInterface } from "../entity/Department";

export interface DepartmentRepoInterface{
  findAll(): Promise<DepartmentInterface[]>;
  create(user: Department): Promise<Department>;
}