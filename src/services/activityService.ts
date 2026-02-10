import { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/api.type";
import apiClient from "@/tools/axios.tool";
import { ActivityCreateRequest, ActivityDto, ActivityUpdateRequest } from "@/types/activity.type";

export async function createActivity(payload: ActivityCreateRequest): Promise<ApiResponse<ActivityDto[]>> {
    const res: AxiosResponse<ApiResponse<ActivityDto[]>> = await apiClient.post("/activities", payload);
    return res.data;
}

export async function updateActivity(activityId: number, payload: ActivityUpdateRequest): Promise<ApiResponse<ActivityDto[]>> {
    const res: AxiosResponse<ApiResponse<ActivityDto[]>> = await apiClient.put(`/activities/${activityId}`, payload);
    return res.data;
}

export async function updateStatusActivity(activityId: number): Promise<ApiResponse<ActivityDto[]>> {
    const res: AxiosResponse<ApiResponse<ActivityDto[]>> = await apiClient.put(`/activities/status/${activityId}`);
    return res.data;
}


export async function getActivityById(activityId: number): Promise<ApiResponse<ActivityDto>> {
    const res: AxiosResponse<ApiResponse<ActivityDto>> = await apiClient.get(`/activities/${activityId}`);
    return res.data;
}

export async function deleteActivity(activityId: number): Promise<ApiResponse<ActivityDto[]>> {
    const res: AxiosResponse<ApiResponse<ActivityDto[]>> = await apiClient.delete(`/activities/${activityId}`);
    return res.data;
}

export async function getAllActivitiesByDeaneryId(deaneryId: number, status: boolean): Promise<ApiResponse<ActivityDto[]>> {
    const res: AxiosResponse<ApiResponse<ActivityDto[]>> = await apiClient.get(`/activities/deanery/${deaneryId}/${status}`);
    return res.data;
}

export async function getActivitiesByTeamId(teamId: number, status: boolean): Promise<ApiResponse<ActivityDto[]>> {
    const res: AxiosResponse<ApiResponse<ActivityDto[]>> = await apiClient.get(`/activities/team/${teamId}/${status}`);
    return res.data;
}
