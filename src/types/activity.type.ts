import { DeaneryDto } from '@/types/deanery.type';
import { AttendanceDto } from "./attendance.type";
import { MemberDto } from "./member.type";
import { CommentDto } from "./comment.type";

export interface PlanRowInput {
    startTime?: string;
    content?: string;
    pic?: string;
    materials?: string;
    notes?: string;
    order: number;
}

export interface ActivityPlanRowDto {
    rowId: number;
    activityId: number;
    startTime?: string;
    content?: string;
    pic?: string;
    materials?: string;
    notes?: string;
    order: number;
}

export interface ActivityCreateRequest {
    deaneryId: number;
    teamId?: number | null;
    date: string;
    time: string;
    description: string;
    note?: string;
    planRows?: PlanRowInput[];
}

export interface ActivityUpdateRequest {
    deaneryId: number;
    teamId?: number | null;
    date: string;
    time: string;
    description: string;
    note?: string;
    planRows?: PlanRowInput[];
}

export interface ActivityDto {
    activityId: number;
    date: string;
    time: string;
    description: string;
    note: string;
    createdBy: MemberDto;
    deanery: DeaneryDto;
    team?: { teamId: number; name: string } | null;
    status: boolean;
    planRows?: ActivityPlanRowDto[];
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
