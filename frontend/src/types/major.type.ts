export interface MajorRequest {
    majorId: number;
    name: string;
    now: boolean;
}

export interface MajorCreateRequest {
    name: string;
}

export interface MajorUpdateRequest {
    name: string;
}

export interface MajorDto {
    majorId: number;
    name: string;
    now: boolean;
}

export type ValidationErrorMajor = Record<string, string>;
