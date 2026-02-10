import apiClient from "@/tools/axios.tool";
import { ApiResponse } from "@/types/api.type";
import { TeamLeaderDto, TeamLeaderAssignRequest } from "@/types/team.type";
import { AxiosResponse } from "axios";

/**
 * Gán huynh trưởng cho team
 */
export async function assignLeaderToTeam(payload: TeamLeaderAssignRequest): Promise<ApiResponse<TeamLeaderDto>> {
    const res: AxiosResponse<ApiResponse<TeamLeaderDto>> = await apiClient.post("/team-leaders", payload);
    return res.data;
}

/**
 * Lấy danh sách huynh trưởng của 1 team
 */
export async function getLeadersByTeamId(teamId: number): Promise<ApiResponse<TeamLeaderDto[]>> {
    const res: AxiosResponse<ApiResponse<TeamLeaderDto[]>> = await apiClient.get(`/team-leaders/team/${teamId}`);
    return res.data;
}

/**
 * Lấy danh sách teams mà 1 huynh trưởng quản lý
 */
export async function getTeamsByLeaderId(leaderId: number): Promise<ApiResponse<any[]>> {
    const res: AxiosResponse<ApiResponse<any[]>> = await apiClient.get(`/team-leaders/leader/${leaderId}`);
    return res.data;
}

/**
 * Xóa huynh trưởng khỏi team
 */
export async function removeLeaderFromTeam(teamId: number, leaderId: number): Promise<ApiResponse<null>> {
    const res: AxiosResponse<ApiResponse<null>> = await apiClient.delete(`/team-leaders/${teamId}/${leaderId}`);
    return res.data;
}

/**
 * Lấy tất cả assignments (admin)
 */
export async function getAllAssignments(): Promise<ApiResponse<any[]>> {
    const res: AxiosResponse<ApiResponse<any[]>> = await apiClient.get("/team-leaders");
    return res.data;
}

