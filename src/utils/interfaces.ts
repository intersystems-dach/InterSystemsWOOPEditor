import { userLevel } from './classes';

export interface User {
  userName: string;
  level: userLevel;
}

export interface Status {
  ok: boolean;
  message: string;
}
