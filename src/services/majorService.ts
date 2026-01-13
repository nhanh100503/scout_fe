import apiClient from "@/tools/axios.tool";
import { ApiResponse } from "@/types/api.type";
import { MajorCreateRequest, MajorDto, MajorUpdateRequest } from "@/types/major.type";
import { AxiosResponse } from "axios";

export async function createMajor(payload: MajorCreateRequest): Promise<ApiResponse<MajorDto[]>> {
    const res: AxiosResponse<ApiResponse<MajorDto[]>> = await apiClient.post("/majors", payload);
    return res.data;
}

export async function updateMajor(majorId: number, payload: MajorUpdateRequest): Promise<ApiResponse<MajorDto[]>> {
    const res: AxiosResponse<ApiResponse<MajorDto[]>> = await apiClient.put(`/majors/${majorId}`, payload);
    return res.data;
}

export async function getMajorById(majorId: number): Promise<ApiResponse<MajorDto>> {
    const res: AxiosResponse<ApiResponse<MajorDto>> = await apiClient.get(`/majors/${majorId}`);
    return res.data;
}

export async function deleteMajor(majorId: number): Promise<ApiResponse<MajorDto>> {
    const res: AxiosResponse<ApiResponse<MajorDto>> = await apiClient.delete(`/majors/${majorId}`);
    return res.data;
}

export async function getAllMajorAndDeleteFlag(): Promise<ApiResponse<MajorDto[]>> {
    const res: AxiosResponse<ApiResponse<MajorDto[]>> = await apiClient.get("/majors");
    return res.data;
}

export async function getAllMajor(): Promise<ApiResponse<MajorDto[]>> {
    const res: AxiosResponse<ApiResponse<MajorDto[]>> = await apiClient.get("/majors/false");
    return res.data;
}