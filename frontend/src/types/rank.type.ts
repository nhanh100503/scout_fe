export interface RankDto {
    rankId: number;
    name: string;
    type: boolean;
}

export interface RankCreateRequest {
    name: string;
    type: boolean;
}

export type ValidationErrorRank = Record<string, string>;

export interface RankUpdateRequest {
    name: string;
    type: boolean;
}