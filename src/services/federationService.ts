import { AxiosResponse } from "axios";
import apiClient from "@/tools/axios.tool";
import { ApiResponse } from "@/types/api.type";
import { FederationDto, FederationCreateRequest, FederationUpdateRequest } from "@/types/federation.type";

export const getAllFederations = async (): Promise<ApiResponse<FederationDto[]>> => {
    const response = await apiClient.get("/federations");
    return response.data;
};

export const getAllFederation = getAllFederations; // Alias for consistency

export const getFederationsByParishId = async (parishId: number): Promise<ApiResponse<FederationDto[]>> => {
    const response = await apiClient.get(`/federations/parish/${parishId}`);
    return response.data;
};

export const getFederationById = async (federationId: number): Promise<ApiResponse<FederationDto>> => {
    const response = await apiClient.get(`/federations/${federationId}`);
    return response.data;
};

export const createFederation = async (data: FederationCreateRequest): Promise<ApiResponse<FederationDto>> => {
    const response = await apiClient.post("/federations", data);
    return response.data;
};

export const updateFederation = async (federationId: number, data: FederationUpdateRequest): Promise<ApiResponse<FederationDto>> => {
    const response = await apiClient.patch(`/federations/${federationId}`, data);
    return response.data;
};

export const deleteFederation = async (federationId: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`/federations/${federationId}`);
    return response.data;
};
