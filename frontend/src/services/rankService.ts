import { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/api.type";
import type { RankDto, RankCreateRequest, RankUpdateRequest } from "@/types/rank.type";
import apiClient from "@/tools/axios.tool";

export async function createRank(payload: RankCreateRequest): Promise<ApiResponse<RankDto[]>> {
    const res: AxiosResponse<ApiResponse<RankDto[]>> = await apiClient.post("/ranks", payload);
    return res.data;
}

export async function updateRank(rankId: number, payload: RankUpdateRequest): Promise<ApiResponse<RankDto[]>> {
    const res: AxiosResponse<ApiResponse<RankDto[]>> = await apiClient.put(`/ranks/${rankId}`, payload);
    return res.data;
}

export async function getRankById(rankId: number): Promise<ApiResponse<RankDto>> {
    const res: AxiosResponse<ApiResponse<RankDto>> = await apiClient.get(`/ranks/${rankId}`);
    return res.data;
}

export async function deleteRank(rankId: number): Promise<ApiResponse<RankDto>> {
    const res: AxiosResponse<ApiResponse<RankDto>> = await apiClient.delete(`/ranks/${rankId}`);
    return res.data;
}


export async function getAllRank(): Promise<ApiResponse<RankDto[]>> {
    const res: AxiosResponse<ApiResponse<RankDto[]>> = await apiClient.get("/ranks");
    return res.data;
}

export async function getAllRanksTypeFalse(): Promise<ApiResponse<RankDto[]>> {
    const res: AxiosResponse<ApiResponse<RankDto[]>> = await apiClient.get("/ranks/false");
    return res.data;
}

export async function getAllRanksTypeTrue(): Promise<ApiResponse<RankDto[]>> {
    const res: AxiosResponse<ApiResponse<RankDto[]>> = await apiClient.get("/ranks/true");
    return res.data;
}