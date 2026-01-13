import { ActivityDto } from './activity.type';
import { MemberDto } from "./member.type";

export interface MemberAttendanceRequest {
    memberId: number;
    present: boolean;
    note: string;
}

export interface AttendanceCreateRequest {
    activityId: number;
    members: MemberAttendanceRequest[];
}

export interface AttendanceDto {
    attendanceId: number;
    member: MemberDto;
    activity: ActivityDto;
    present: boolean;
    note: string;
}