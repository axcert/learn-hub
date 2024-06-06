import { ReactNode } from 'react';
import { Config } from 'ziggy-js';
export interface User {
    image: string | undefined;
    imageUrl: string | undefined;
    teacher: any;
    
    user: any;
    bio: ReactNode;
    service: any;
    experience: ReactNode;
    position: string;
    role: ReactNode;
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}
export interface Teacher {
    services: any;
    user: any;
    phone: ReactNode;
    id: number;
    name: string;
    teacherId : string;
    bio : string;
    position : string;
  }

  export type Booking = {
    user: any;
    teacher: any;
    student: any;
    date: any;
    service: any;
    user_id: number;
    id: number;
    description: string;
    status: string;
    timestamp: Date;
    // Add other fields as needed
  };
  
  export interface Service {
    
    image: any;
    user: any;
    student: any;
    bookings: any;
    position: ReactNode;
    bio: ReactNode;
    service: any;
    service_id: string;
    id: number;
  
    name: string;
    description: string;
    experience: string;
    hourly_rate?: number;
    teacher_id?: number; // Ensure this is a number
    admin_id: number;
    title?: ReactNode; // Optional properties
    status?: string;
    rating?: ReactNode;
    date?: ReactNode;
    teacher?: User; // Assuming User is defined elsewhere and represents the teacher
  }
  export interface Filters {
    search: string;
  }


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {user: User};
    studentCount: number;
    teacherCount: number;
    serviceCount: number;
    adminCount: number;
    ziggy: Config & { location: string };
    userTeachers: any[];
    userStudents: any[];
    students: any;
    services: any;
    
    adminServices: any[];
    admins: any[];
    users: any[];
   
};


