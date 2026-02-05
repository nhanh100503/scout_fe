import apiClient from "@/tools/axios.tool";
import { ApiResponse } from "@/types/api.type";
import { RoleDto } from "@/types/role.type";
import { AxiosResponse } from "axios";

export async function getAllRoles(): Promise<ApiResponse<RoleDto[]>> {
    const res: AxiosResponse<ApiResponse<RoleDto[]>> = await apiClient.get("/roles");
    return res.data;
}
