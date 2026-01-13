import apiClient from "@/tools/axios.tool";
import { ApiResponse } from "@/types/api.type";
import { UserCreateRequest, UserDto, UserUpdateRequest } from "@/types/user.type";
import { AxiosResponse } from "axios";

export async function createUser(payload: UserCreateRequest): Promise<ApiResponse<UserDto>> {
    const res: AxiosResponse<ApiResponse<UserDto>> = await apiClient.post("/users", payload);
    return res.data;
}

export async function updateUser(userId: number, payload: UserUpdateRequest): Promise<ApiResponse<UserDto>> {
    const res: AxiosResponse<ApiResponse<UserDto>> = await apiClient.put(`/users/${userId}`, payload);
    return res.data;
}

export async function getUserById(userId: number): Promise<ApiResponse<UserDto>> {
    const res: AxiosResponse<ApiResponse<UserDto>> = await apiClient.get(`/users/${userId}`);
    return res.data;
}

export async function getAllUser(): Promise<ApiResponse<UserDto[]>> {
    const res: AxiosResponse<ApiResponse<UserDto[]>> = await apiClient.get(`/users`);
    return res.data;
}

export async function deleteUser(userId: number): Promise<ApiResponse<UserDto>> {
    const res: AxiosResponse<ApiResponse<UserDto>> = await apiClient.delete(`/users/${userId}`);
    return res.data;
}