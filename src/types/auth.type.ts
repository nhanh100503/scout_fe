export interface AuthLoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
}

export type ValidationLoginErrors = {
    email?: string;
    password?: string;
};