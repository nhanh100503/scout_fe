import apiClient from "@/tools/axios.tool";
import { ApiResponse } from "@/types/api.type";
import { CommentDto, CommentCreateRequest, CommentUpdateRequest } from "@/types/comment.type";
import { AxiosResponse } from "axios";
export async function createComment(payload: CommentCreateRequest): Promise<ApiResponse<CommentDto>> {
    const res: AxiosResponse<ApiResponse<CommentDto>> = await apiClient.post("/comments", payload);
    return res.data;
}
export async function getCommentsByActivity(activityId: number): Promise<ApiResponse<CommentDto[]>> {
    const res: AxiosResponse<ApiResponse<CommentDto[]>> = await apiClient.get(`/comments/activity/${activityId}`);
    return res.data;
}
export async function updateComment(commentId: number, payload: CommentUpdateRequest): Promise<ApiResponse<CommentDto>> {
    const res: AxiosResponse<ApiResponse<CommentDto>> = await apiClient.put(`/comments/${commentId}`, payload);
    return res.data;
}
export async function deleteComment(commentId: number): Promise<ApiResponse<void>> {
    const res: AxiosResponse<ApiResponse<void>> = await apiClient.delete(`/comments/${commentId}`);
    return res.data;
}
