export interface DeaneryDto {
    deaneryId: number;
    name: string;
}

export interface DeaneryCreateRequest {
    name: string;
}

export interface DeaneryUpdateRequest {
    name: string;
}

export type ValidationErrorDeanery = Record<string, string>;
