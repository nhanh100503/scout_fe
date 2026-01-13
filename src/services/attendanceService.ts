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