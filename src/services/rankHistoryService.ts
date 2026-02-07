import { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/api.type";
import apiClient from "@/tools/axios.tool";

export interface RankHistoryDto {
    rankHistoryId: number;
    memberId: number;
    rankId: number;
    assignerId: number;
    notes: string;
    evidenceUrls: [];
    createdAt: string;
    member?: {
        memberId: number;
        name: string;
    };
    rank?: {
        rankId: number;
        name: string;
        type: boolean;
    };
    assigner?: {
        memberId: number;
        name: string;
    };
}

export interface AssignRankRequest {
    memberId: number;
    rankId: number;
    notes?: string;
    evidenceFiles?: File[];
}

export async function assignRank(payload: AssignRankRequest): Promise<ApiResponse<RankHistoryDto>> {
    const formData = new FormData();
    formData.append("memberId", payload.memberId.toString());
    formData.append("rankId", payload.rankId.toString());
    if (payload.notes) {
        formData.append("notes", payload.notes);
    }
    if (payload.evidenceFiles) {
        payload.evidenceFiles.forEach((file) => {
            formData.append("evidenceFiles", file);
        });
    }

    const res: AxiosResponse<ApiResponse<RankHistoryDto>> = await apiClient.post("/rank-history/assign", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
}

export async function getRankHistory(memberId: number): Promise<ApiResponse<RankHistoryDto[]>> {
    const res: AxiosResponse<ApiResponse<RankHistoryDto[]>> = await apiClient.get(`/rank-history/${memberId}`);
    return res.data;
}
