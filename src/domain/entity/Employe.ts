export interface Employe {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;  
  salt: string;
  role: string; 
  departmentId: number | null;
  designation: string | null;
  hire_date: Date;
  leave_balance: number;
}

