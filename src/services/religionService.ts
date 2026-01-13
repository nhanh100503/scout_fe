import { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/api.type";
import apiClient from "@/tools/axios.tool";
import { ReligionCreateRequest, ReligionDto, ReligionUpdateRequest } from "@/types/religion.type";

export async function createReligion(payload: ReligionCreateRequest): Promise<ApiResponse<ReligionDto[]>> {
    const res: AxiosResponse<ApiResponse<ReligionDto[]>> = await apiClient.post("/religions", payload);
    return res.data;
}

export async function updateReligion(religionId: number, payload: ReligionUpdateRequest): Promise<ApiResponse<ReligionDto[]>> {
    const res: AxiosResponse<ApiResponse<ReligionDto[]>> = await apiClient.put(`/religions/${religionId}`, payload);
    return res.data;
}

export async function getReligionById(religionId: number): Promise<ApiResponse<ReligionDto>> {
    const res: AxiosResponse<ApiResponse<ReligionDto>> = await apiClient.get(`/religions/${religionId}`);
    return res.data;
}

export async function deleteReligion(religionId: number): Promise<ApiResponse<ReligionDto>> {
    const res: AxiosResponse<ApiResponse<ReligionDto>> = await apiClient.delete(`/religions/${religionId}`);
    return res.data;
}

export async function getAllReligion(): Promise<ApiResponse<ReligionDto[]>> {
    const res: AxiosResponse<ApiResponse<ReligionDto[]>> = await apiClient.get("/religions");
    return res.data;
}