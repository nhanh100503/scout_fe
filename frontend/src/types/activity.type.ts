import { DeaneryDto } from '@/types/deanery.type';
import { AttendanceDto } from "./attendance.type";
import { MemberDto } from "./member.type";

export interface ActivityCreateRequest {
    deaneryId: number;
    date: string;
    time: string;
    description: string;
    note?: string
}

export interface ActivityUpdateRequest {
    deaneryId: number;
    date: string;
    time: string;
    description: string;
    note?: string
}

export interface ActivityDto {
    activityId: number;
    date: string;
    time: string;
    description: string;
    note: string;
    createdBy: MemberDto;
    deanery: DeaneryDto;
    status: boolean;
    attendances?: AttendanceDto[];
}

export type ValidationErrorActivity = Record<string, string>;
