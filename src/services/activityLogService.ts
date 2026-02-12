import { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/api.type";
import apiClient from "@/tools/axios.tool";
import { ActivityLogDto } from "@/types/activity.type";

export async function createActivityLog(payload: FormData): Promise<ApiResponse<ActivityLogDto>> {
    const res: AxiosResponse<ApiResponse<ActivityLogDto>> = await apiClient.post("/activity-logs", payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
}

export async function getActivityLogsByActivity(activityId: number): Promise<ApiResponse<ActivityLogDto[]>> {
    const res: AxiosResponse<ApiResponse<ActivityLogDto[]>> = await apiClient.get(`/activity-logs/activity/${activityId}`);
    return res.data;
}

export async function updateActivityLog(logId: number, payload: FormData): Promise<ApiResponse<ActivityLogDto>> {
    const res: AxiosResponse<ApiResponse<ActivityLogDto>> = await apiClient.put(`/activity-logs/${logId}`, payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
}

export async function deleteActivityLog(logId: number): Promise<ApiResponse<any>> {
    const res: AxiosResponse<ApiResponse<any>> = await apiClient.delete(`/activity-logs/${logId}`);
    return res.data;
}

export async function deleteActivityImage(imageId: number): Promise<ApiResponse<any>> {
    const res: AxiosResponse<ApiResponse<any>> = await apiClient.delete(`/activity-logs/image/${imageId}`);
    return res.data;
}
