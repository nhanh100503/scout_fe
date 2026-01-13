export interface RoleStatisticsDto {
    roleName: string;
    total: number;
    maleCount: number;
    femaleCount: number;
}

export interface ResponsibilityStatisticsDto {
    majorId: number;
    majorName: string;
    responsibilityName: string;
    responsibilityId: number;
    maleCount: number;
    femaleCount: number;
}

export interface ReligionStatisticsDto {
    religionName: string;
    total: number;
}
