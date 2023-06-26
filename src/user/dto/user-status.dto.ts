import { Tiezi } from "src/tiezi/entities/tiezi.entity";

export interface UserStatusDTO {
  userName: string;
  id: number;
  userId: string;
  email: string;
  photoUser: string;
  aboutMe: string;
  tiezis: Tiezi[];
}
export interface UserStatusDTO2 {
  username: string;
  id: number;
  email: string;
  photoUser: string;
}
