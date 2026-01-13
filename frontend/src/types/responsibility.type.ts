import { MajorDto } from "./major.type";

export interface ResponsibilityDto {
    responsibilityId: number;
    name: string;
    type: number;
    major?: MajorDto;
}
