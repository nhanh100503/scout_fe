import { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/api.type";
import apiClient from "@/tools/axios.tool";
import { AttendanceCreateRequest, AttendanceDto } from "@/types/attendance.type";

export async function createAttendance(payload: AttendanceCreateRequest): Promise<ApiResponse<AttendanceDto[]>> {
    const res: AxiosResponse<ApiResponse<AttendanceDto[]>> = await apiClient.post("/attendances", payload);
    return res.data;
}

export async function getAttendanceByActivity(activityId: number): Promise<ApiResponse<AttendanceDto[]>> {
    const res: AxiosResponse<ApiResponse<AttendanceDto[]>> = await apiClient.get(`/attendances/activity/${activityId}`);
    return res.data;
}

/**
 * HT/DT lấy danh sách đoàn sinh trong teams mình quản lý để điểm danh
 */
export async function getMembersForMyTeamAttendance(activityId: number): Promise<ApiResponse<any[]>> {
    const res: AxiosResponse<ApiResponse<any[]>> = await apiClient.get(`/attendances/activity/${activityId}/my-team`);
    return res.data;
}

/**
 * Admin xem tổng hợp tất cả teams trong activity
 */
export async function getAllTeamsForActivity(activityId: number): Promise<ApiResponse<any[]>> {
    const res: AxiosResponse<ApiResponse<any[]>> = await apiClient.get(`/attendances/activity/${activityId}/all-teams`);
    return res.data;
}
