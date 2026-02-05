import { GenderDto } from "./gender.type";
import { RoleDto } from "./role.type";

export interface UserUpdateRequest {
    name: string;
    phone: string;
    address: string;
    genderId: number;
    roles?: number[];
}

export interface UserCreateRequest {
    name: string;
    phone: string;
    email: string;
    password: string;
    address: string;
    genderId: number;
}

export interface UserDto {
    memberId: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    gender: GenderDto;
    roles: RoleDto[];
}

export type ValidationErrorUser = Record<string, string>;