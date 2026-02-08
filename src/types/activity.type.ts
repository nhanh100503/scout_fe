import { DeaneryDto } from '@/types/deanery.type';
import { AttendanceDto } from "./attendance.type";
import { MemberDto } from "./member.type";
import { CommentDto } from "./comment.type";

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
    comments?: CommentDto[];
    logs?: ActivityLogDto[];
}

export interface ActivityImageDto {
    imageId: number;
    imageUrl: string;
    logId: number;
}

export interface ActivityLogDto {
    logId: number;
    title?: string;
    content: string;
    activityId: number;
    createdBy: number;
    author?: MemberDto;
    images?: ActivityImageDto[];
    createdAt: string;
    updatedAt: string;
}

export type ValidationErrorActivity = Record<string, string>;
