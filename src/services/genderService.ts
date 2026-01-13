import apiClient from "@/tools/axios.tool";
import { ApiResponse } from "@/types/api.type";
import { GenderDto } from "@/types/gender.type";
import { AxiosResponse } from "axios";

export async function getAllGenders(): Promise<ApiResponse<GenderDto[]>> {
    const res: AxiosResponse<ApiResponse<GenderDto[]>> = await apiClient.get("/genders");
    return res.data;
}