import { DeaneryDto } from "./deanery.type";
import { GenderDto } from "./gender.type";
import { MajorDto, MajorRequest } from "./major.type";
import { RankDto } from "./rank.type";
import { ReligionDto } from "./religion.type";
import { ResponsibilityDto } from "./responsibility.type";
import { RoleDto } from "./role.type";
import { ParishDto } from "./parish.type";
import { FederationDto } from "./federation.type";

export interface MemberRoleDSCreateRequest {
    name: string;
    birthday: string;
    startYear: string;
    pledgeYear: string;
    parishId: number | null;
    federationId: number | null;
    team: string;

    deaneryId: number | null;
    genderId: number | null;
    roleId: number;
    religionId: number | null;
    responsibilityId: number | null;

    majors?: MajorRequest[];
}

export interface MemberRoleDSUpdateRequest {
    name: string;
    birthday: string;
    startYear: string;
    pledgeYear: string;
    parishId: number | null;
    federationId: number | null;
    team: string;

    deaneryId: number | null;
    genderId: number | null;
    roleId: number;
    religionId: number | null;
    responsibilityId: number | null;

    majors?: MajorRequest[];
}

export interface MemberRoleHTUpdateRequest {
    name: string;
    identify: string;
    phone: string;
    email: string;
    birthday: string;
    startYear: string;
    pledgeYear: string;
    address: string;
    career: string;
    placeOfBirth: string;
    otherResponsibility: string;
    parishId: number | null;
    federationId: number | null;
    team: string;

    deaneryId: number | null;
    genderId: number | null;
    roleId: number;
    religionId: number | null;
    responsibilityId: number | null;

    majors?: MajorRequest[];
}

export interface MemberRoleHTCreateRequest {
    name: string;
    identify: string;
    phone: string;
    email: string;
    birthday: string;
    startYear: string;
    pledgeYear: string;
    address: string;
    career: string;
    placeOfBirth: string;
    otherResponsibility: string;
    parishId: number | null;
    federationId: number | null;
    team: string;

    deaneryId: number | null;
    genderId: number | null;
    roleId: number;
    religionId: number | null;
    responsibilityId: number | null;

    majors?: MajorRequest[];
}

export interface MemberRoleDTCreateRequest {
    name: string;
    identify: string;
    phone: string;
    email: string;
    birthday: string;
    startYear: string;
    pledgeYear: string;
    address: string;
    career: string;
    placeOfBirth: string;
    otherResponsibility: string;
    parishId: number | null;
    federationId: number | null;
    team: string;

    deaneryId: number | null;
    genderId: number | null;
    roleId: number;
    religionId: number | null;
    responsibilityId: number | null;

    majors?: MajorRequest[];
}

export interface MemberRoleDTUpdateRequest {
    name: string;
    identify: string;
    phone: string;
    email: string;
    birthday: string;
    startYear: string;
    pledgeYear: string;
    address: string;
    career: string;
    placeOfBirth: string;
    otherResponsibility: string;
    parishId: number | null;
    federationId: number | null;
    team: string;

    deaneryId: number | null;
    genderId: number | null;
    roleId: number;
    religionId: number | null;
    responsibilityId: number | null;

    majors?: MajorRequest[];
}

export type ValidationErrorMember = Record<string, string>;


export interface MemberDto {
    memberId: number;
    name: string;
    identify?: string;
    phone?: string;
    email?: string;
    birthday: string;
    startYear: string;
    pledgeYear: string;
    address: string;
    career: string;
    placeOfBirth?: string;
    otherResponsibility?: string;
    deaneryId?: number;
    parishId?: number;
    federationId?: number;
    team: string;
    avatar?: string;

    deanery?: DeaneryDto;
    parish?: ParishDto;
    federation?: FederationDto;
    gender?: GenderDto;
    rank?: RankDto;
    roles?: RoleDto[];  // Changed from role?: RoleDto to support multiple roles
    religion?: ReligionDto;
    responsibility?: ResponsibilityDto;

    majors?: MajorDto[];
}