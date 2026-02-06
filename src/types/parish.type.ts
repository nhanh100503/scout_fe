export interface ParishDto {
  parishId: number;
  name: string;
  deaneryId: number;
  deleteFlag: boolean;
  deanery?: {
    deaneryId: number;
    name: string;
  };
}

export interface ParishCreateRequest {
  name: string;
  deaneryId: number;
}

export interface ParishUpdateRequest {
  name?: string;
  deaneryId?: number;
}
