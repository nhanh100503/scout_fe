export interface TeamDto {
    teamId: number;
    name: string;
    parishId: number;
    deleteFlag: boolean;
    createdAt: string;
    updatedAt: string;
    parish?: {
        name: string;
        deaneryId: number;
    };
    _count?: {
        members: number;
    };
    teamLeaders?: TeamLeaderDto[];
}

export interface TeamLeaderDto {
    id: number;
    teamId: number;
    leaderId: number;
    assignedAt: string;
    deleteFlag: boolean;
    leader: {
        memberId: number;
        name: string;
        email: string;
        phone?: string;
        avatar?: string;
    };
}

export interface TeamLeaderAssignRequest {
    teamId: number;
    leaderId: number;
}

export interface TeamCreateRequest {
    name: string;
    parishId: number;
}

export interface TeamUpdateRequest {
    name?: string;
    parishId?: number;
}
