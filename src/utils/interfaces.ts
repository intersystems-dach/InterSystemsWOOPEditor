import { UserLevel } from './classes';

export interface User {
  username: string;
  level: UserLevel;
}

export interface Status {
  ok: boolean;
  message: string;
}
