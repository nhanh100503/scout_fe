import apiClient from "@/tools/axios.tool";
import { ApiResponse } from "@/types/api.type";
import { AuthLoginRequest, AuthResponse, ResetPasswordRequest } from "@/types/auth.type";
import { MemberDto } from "@/types/member.type";
import { AxiosResponse } from "axios";

export async function login(payload: AuthLoginRequest): Promise<ApiResponse<AuthResponse>> {
    const res: AxiosResponse<ApiResponse<AuthResponse>> = await apiClient.post("/auth/login", payload);
    return res.data;
}

export async function resetPassword(payload: ResetPasswordRequest, token: string): Promise<ApiResponse<void>> {
    const res: AxiosResponse<ApiResponse<void>> = await apiClient.post(`/auth/reset-password?token=${token}`,
    payload);
    return res.data;
}

export async function getCurrentMember(): Promise<ApiResponse<MemberDto>> {
    const res: AxiosResponse<ApiResponse<MemberDto>> = await apiClient.get("/auth/me");
    return res.data;
}