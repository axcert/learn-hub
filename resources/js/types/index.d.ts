import { ReactNode } from 'react';
import { Config } from 'ziggy-js';

export interface User {
    
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
    phone: ReactNode;
    id: number;
    name: string;
    teacherId : string;
    bio : string;
    position : string;
  }
  
  export interface Service {
    position: ReactNode;
    bio: ReactNode;
    service: any;
    service_id: string;
    id: number; // Ensure this is a number
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
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
