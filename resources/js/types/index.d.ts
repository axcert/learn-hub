import { Config } from 'ziggy-js';

export interface User {
    position: ReactNode;
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
  }
  
  export interface Service {
    title: ReactNode;
    status: string;
    rating: ReactNode;
    status: ReactNode;
    date: ReactNode;
    title: ReactNode;
    status: string;
    experience: string;
    teacher_id: string;
    service_id: string;
    admin_id: string;
    service_id: string;
    admin_id: string;
    teacher_id: string;
    experience: string;
    id: number;
    name: string;
    description: string;
    hourly_rate: number;
    teacher?: Teacher;
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
