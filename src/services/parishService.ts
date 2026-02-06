import { AxiosResponse } from "axios";
import apiClient from "@/tools/axios.tool";
import { ApiResponse } from "@/types/api.type";
import { ParishDto, ParishCreateRequest, ParishUpdateRequest } from "@/types/parish.type";

export const getAllParishes = async (): Promise<ApiResponse<ParishDto[]>> => {
    const response = await apiClient.get("/parishes");
    return response.data;
};

export const getAllParish = getAllParishes; // Alias for consistency

export const getParishesByDeaneryId = async (deaneryId: number): Promise<ApiResponse<ParishDto[]>> => {
    const response = await apiClient.get(`/parishes/deanery/${deaneryId}`);
    return response.data;
};

export const getParishById = async (parishId: number): Promise<ApiResponse<ParishDto>> => {
    const response = await apiClient.get(`/parishes/${parishId}`);
    return response.data;
};

export const createParish = async (data: ParishCreateRequest): Promise<ApiResponse<ParishDto>> => {
    const response = await apiClient.post("/parishes", data);
    return response.data;
};

export const updateParish = async (parishId: number, data: ParishUpdateRequest): Promise<ApiResponse<ParishDto>> => {
    const response = await apiClient.patch(`/parishes/${parishId}`, data);
    return response.data;
};

export const deleteParish = async (parishId: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`/parishes/${parishId}`);
    return response.data;
};
