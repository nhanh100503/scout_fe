export interface FederationDto {
    federationId: number;
    name: string;
    parishId: number;
    deleteFlag: boolean;
    parish?: {
        parishId: number;
        name: string;
        deanery?: {
            deaneryId: number;
            name: string;
        };
    };
}

export interface FederationCreateRequest {
    name: string;
    parishId: number;
}

export interface FederationUpdateRequest {
    name?: string;
    parishId?: number;
}
