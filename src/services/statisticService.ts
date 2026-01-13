import apiClient from "@/tools/axios.tool";
import { ApiResponse } from "@/types/api.type";
import { ReligionStatisticsDto, ResponsibilityStatisticsDto, RoleStatisticsDto } from "@/types/statistic.type";
import { AxiosResponse } from "axios";

export async function getRoleDSStats(deaneryId: number): Promise<ApiResponse<RoleStatisticsDto[]>> {
    const res: AxiosResponse<ApiResponse<RoleStatisticsDto[]>> = await apiClient.get(`/statistics/roles/ds/${deaneryId}`);
    return res.data;
}

export async function getRoleHTStats(deaneryId: number): Promise<ApiResponse<RoleStatisticsDto[]>> {
    const res: AxiosResponse<ApiResponse<RoleStatisticsDto[]>> = await apiClient.get(`/statistics/roles/ht/${deaneryId}`);
    return res.data;
}

export async function getResponsibilityMajorStatsDS(deaneryId: number): Promise<ApiResponse<ResponsibilityStatisticsDto[]>> {
    const res: AxiosResponse<ApiResponse<ResponsibilityStatisticsDto[]>> = await apiClient.get(`/statistics/responsibilities/ds/${deaneryId}`);
    return res.data;
}

export async function getResponsibilityMajorStatsHT(deaneryId: number): Promise<ApiResponse<ResponsibilityStatisticsDto[]>> {
    const res: AxiosResponse<ApiResponse<ResponsibilityStatisticsDto[]>> = await apiClient.get(`/statistics/responsibilities/ht/${deaneryId}`);
    return res.data;
}


export async function getReligionStatsRoleDS(deaneryId: number): Promise<ApiResponse<ReligionStatisticsDto[]>> {
    const res: AxiosResponse<ApiResponse<ReligionStatisticsDto[]>> = await apiClient.get(`/statistics/religions/ds/${deaneryId}`);
    return res.data;
}

export async function getReligionStatsRoleHT(deaneryId: number): Promise<ApiResponse<ReligionStatisticsDto[]>> {
    const res: AxiosResponse<ApiResponse<ReligionStatisticsDto[]>> = await apiClient.get(`/statistics/religions/ht/${deaneryId}`);
    return res.data;
}