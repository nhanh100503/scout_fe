import apiClient from "@/tools/axios.tool";
import { ApiResponse } from "@/types/api.type";
import { ResponsibilityDto } from "@/types/responsibility.type";
import { AxiosResponse } from "axios";

export async function getAllResponsibilitiesByMajorId(majorId: number): Promise<ApiResponse<ResponsibilityDto[]>> {
    const res: AxiosResponse<ApiResponse<ResponsibilityDto[]>> = await apiClient.get(`/responsibilities/by/${majorId}`);
    return res.data;
}

export async function getAllResponsibilitiesDSByMajorId(majorId: number): Promise<ApiResponse<ResponsibilityDto[]>> {
    const res: AxiosResponse<ApiResponse<ResponsibilityDto[]>> = await apiClient.get(`/responsibilities/ds/${majorId}`);
    return res.data;
}

export async function getAllResponsibilitiesHTByMajorId(majorId: number): Promise<ApiResponse<ResponsibilityDto[]>> {
    const res: AxiosResponse<ApiResponse<ResponsibilityDto[]>> = await apiClient.get(`/responsibilities/ht/${majorId}`);
    return res.data;
}

export async function getAllResponsibilitiesDTByMajorId(majorId: number): Promise<ApiResponse<ResponsibilityDto[]>> {
    const res: AxiosResponse<ApiResponse<ResponsibilityDto[]>> = await apiClient.get(`/responsibilities/dt/${majorId}`);
    return res.data;
}