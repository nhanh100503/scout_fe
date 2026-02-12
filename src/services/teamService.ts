import apiClient from "@/tools/axios.tool";
import { ApiResponse } from "@/types/api.type";
import { TeamDto, TeamCreateRequest, TeamUpdateRequest } from "@/types/team.type";
import { AxiosResponse } from "axios";

export async function getAllTeams(params?: any): Promise<ApiResponse<TeamDto[]>> {
    const res: AxiosResponse<ApiResponse<TeamDto[]>> = await apiClient.get("/teams", { params });
    return res.data;
}

export async function getTeamsByParishId(parishId: number): Promise<ApiResponse<TeamDto[]>> {
    const res: AxiosResponse<ApiResponse<TeamDto[]>> = await apiClient.get("/teams", { params: { parishId } });
    return res.data;
}

export async function getTeamsByParishIdAndMajorId(parishId: number, majorId: number): Promise<ApiResponse<TeamDto[]>> {
    const res: AxiosResponse<ApiResponse<TeamDto[]>> = await apiClient.get("/teams", { params: { parishId, majorId } });
    return res.data;
}

export async function getTeamsByDeaneryId(deaneryId: number): Promise<ApiResponse<TeamDto[]>> {
    const res: AxiosResponse<ApiResponse<TeamDto[]>> = await apiClient.get("/teams", { params: { deaneryId } });
    return res.data;
}

export async function getTeamsByDeaneryIdAndMajorId(deaneryId: number, majorId: number): Promise<ApiResponse<TeamDto[]>> {
    const res: AxiosResponse<ApiResponse<TeamDto[]>> = await apiClient.get("/teams", { params: { deaneryId, majorId } });
    return res.data;
}

export async function getTeamById(teamId: number): Promise<ApiResponse<TeamDto>> {
    const res: AxiosResponse<ApiResponse<TeamDto>> = await apiClient.get(`/teams/${teamId}`);
    return res.data;
}

export async function createTeam(payload: TeamCreateRequest): Promise<ApiResponse<TeamDto>> {
    const res: AxiosResponse<ApiResponse<TeamDto>> = await apiClient.post("/teams", payload);
    return res.data;
}

export async function updateTeam(teamId: number, payload: TeamUpdateRequest): Promise<ApiResponse<TeamDto>> {
    const res: AxiosResponse<ApiResponse<TeamDto>> = await apiClient.put(`/teams/${teamId}`, payload);
    return res.data;
}

export async function deleteTeam(teamId: number): Promise<ApiResponse<null>> {
    const res: AxiosResponse<ApiResponse<null>> = await apiClient.delete(`/teams/${teamId}`);
    return res.data;
}