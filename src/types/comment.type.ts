import { MemberDto } from './member.type';

export interface CommentDto {
    commentId: number;
    content: string;
    activityId: number;
    parentCommentId?: number | null;
    createdAt: string;
    updatedAt: string;
    member: {
        memberId: number;
        name: string;
        email: string;
        avatar?: string;
    };
    replies?: CommentDto[]; // Nested replies
}

export interface CommentCreateRequest {
    activityId: number;
    content: string;
    parentCommentId?: number | null; // For nested replies
}

export interface CommentUpdateRequest {
    content: string;
}

export type ValidationErrorComment = Record<string, string>;
