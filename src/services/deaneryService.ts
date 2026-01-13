import { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/api.type";
import apiClient from "@/tools/axios.tool";
import { DeaneryCreateRequest, DeaneryDto, DeaneryUpdateRequest } from "@/types/deanery.type";

export async function createDeanery(payload: DeaneryCreateRequest): Promise<ApiResponse<DeaneryDto[]>> {
    const res: AxiosResponse<ApiResponse<DeaneryDto[]>> = await apiClient.post("/deaneries", payload);
    return res.data;
}

export async function updateDeanery(deaneryId: number, payload: DeaneryUpdateRequest): Promise<ApiResponse<DeaneryDto[]>> {
    const res: AxiosResponse<ApiResponse<DeaneryDto[]>> = await apiClient.put(`/deaneries/${deaneryId}`, payload);
    return res.data;
}

export async function getDeaneryById(deaneryId: number): Promise<ApiResponse<DeaneryDto>> {
    const res: AxiosResponse<ApiResponse<DeaneryDto>> = await apiClient.get(`/deaneries/${deaneryId}`);
    return res.data;
}

export async function deleteDeanery(deaneryId: number): Promise<ApiResponse<DeaneryDto>> {
    const res: AxiosResponse<ApiResponse<DeaneryDto>> = await apiClient.delete(`/deaneries/${deaneryId}`);
    return res.data;
}

export async function getAllDeanery(): Promise<ApiResponse<DeaneryDto[]>> {
    const res: AxiosResponse<ApiResponse<DeaneryDto[]>> = await apiClient.get("/deaneries");
    return res.data;
}