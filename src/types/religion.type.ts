export interface ReligionDto {
    religionId: number;
    name: string;
}

export interface ReligionCreateRequest {
    name: string;
}

export interface ReligionUpdateRequest {
    name: string;
}

export type ValidationErrorReligion = Record<string, string>;