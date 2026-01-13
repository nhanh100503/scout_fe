export interface JWTPayloadDto {
    memberId: number;
    email: string;
    role: string;
    exp: number;
}
