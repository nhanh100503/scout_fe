import apiClient from "@/tools/axios.tool";
import { ApiResponse } from "@/types/api.type";
import { MemberRoleDSCreateRequest, MemberDto, MemberRoleDSUpdateRequest, MemberRoleHTUpdateRequest, MemberRoleDTCreateRequest, MemberRoleDTUpdateRequest } from "@/types/member.type";
import { AxiosResponse } from "axios";

export async function createMemberRoleDS(payload: MemberRoleDSCreateRequest): Promise<ApiResponse<MemberDto>> {
    const res: AxiosResponse<ApiResponse<MemberDto>> = await apiClient.post("/members/ds", payload);
    return res.data;
}

export async function createMemberRoleHT(payload: MemberRoleDSCreateRequest): Promise<ApiResponse<MemberDto>> {
    const res: AxiosResponse<ApiResponse<MemberDto>> = await apiClient.post("/members/ht", payload);
    return res.data;
}

export async function createMemberRoleDT(payload: MemberRoleDTCreateRequest): Promise<ApiResponse<MemberDto>> {
    const res: AxiosResponse<ApiResponse<MemberDto>> = await apiClient.post("/members/dt", payload);
    return res.data;
}

export async function getMemberById(memberId: number): Promise<ApiResponse<MemberDto>> {
    const res: AxiosResponse<ApiResponse<MemberDto>> = await apiClient.get(`/members/${memberId}`);
    return res.data;
}

export async function updateMemberRoleDS(memberId: number, payload: MemberRoleDSUpdateRequest): Promise<ApiResponse<MemberDto>> {
    const res: AxiosResponse<ApiResponse<MemberDto>> = await apiClient.put(`/members/ds/${memberId}`, payload);
    return res.data;
}

export async function updateMemberRoleHT(memberId: number, payload: MemberRoleHTUpdateRequest): Promise<ApiResponse<MemberDto>> {
    const res: AxiosResponse<ApiResponse<MemberDto>> = await apiClient.put(`/members/ht/${memberId}`, payload);
    return res.data;
}

export async function updateMemberRoleDT(memberId: number, payload: MemberRoleDTUpdateRequest): Promise<ApiResponse<MemberDto>> {
    const res: AxiosResponse<ApiResponse<MemberDto>> = await apiClient.put(`/members/dt/${memberId}`, payload);
    return res.data;
}

export async function deleteMemberById(memberId: number): Promise<ApiResponse<MemberDto>> {
    const res: AxiosResponse<ApiResponse<MemberDto>> = await apiClient.delete(`/members/${memberId}`);
    return res.data;
}

export async function getAllMemberRoleDS(): Promise<ApiResponse<MemberDto[]>> {
    const res: AxiosResponse<ApiResponse<MemberDto[]>> = await apiClient.get("/members/ds");
    return res.data;
}

export async function getAllMembers(): Promise<ApiResponse<MemberDto[]>> {
    const res: AxiosResponse<ApiResponse<MemberDto[]>> = await apiClient.get("/members");
    return res.data;
}

export async function getAllMemberRoleHT(): Promise<ApiResponse<MemberDto[]>> {
    const res: AxiosResponse<ApiResponse<MemberDto[]>> = await apiClient.get("/members/ht");
    return res.data;
}

export async function getAllMemberRoleDT(): Promise<ApiResponse<MemberDto[]>> {
    const res: AxiosResponse<ApiResponse<MemberDto[]>> = await apiClient.get("/members/dt");
    return res.data;
}

export async function getAllMembersByDeaneryId(deaneryId: number): Promise<ApiResponse<MemberDto[]>> {
    const res: AxiosResponse<ApiResponse<MemberDto[]>> = await apiClient.get(`/members/deanery/${deaneryId}`);
    return res.data;
}

export async function countMember(roleName: string): Promise<ApiResponse<number>> {
    const res: AxiosResponse<ApiResponse<number>> = await apiClient.get(`/statistics/count/${roleName}`);
    return res.data;
}

export async function uploadAvatar(memberId: number, file: File): Promise<ApiResponse<MemberDto>> {
    const formData = new FormData();
    formData.append('avatar', file);

    const res: AxiosResponse<ApiResponse<MemberDto>> = await apiClient.post(
        `/members/${memberId}/avatar`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return res.data;
}

export async function getAllLeaders(): Promise<ApiResponse<MemberDto[]>> {
    const res: AxiosResponse<ApiResponse<MemberDto[]>> = await apiClient.get("/members/leaders/all");
    return res.data;
}

export async function updateMemberTeam(memberId: number, teamId: number | null): Promise<ApiResponse<MemberDto>> {
    const res: AxiosResponse<ApiResponse<MemberDto>> = await apiClient.patch(`/members/${memberId}/team`, { teamId });
    return res.data;
}