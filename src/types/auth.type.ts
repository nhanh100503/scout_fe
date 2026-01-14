export interface AuthLoginRequest {
    email: string;
    password: string;
}

export interface ResetPasswordRequest {
    currentPassword: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
}

export type ValidationLoginErrors = {
    email?: string;
    password?: string;
};

export type ValidationResetPasswordErrors = {
    currentPassword?: string;
    password?: string;
};