import { Payload } from "./payload";

export type UserData = {
  avatarUrl?: string;
  displayName?: string;
  email?: string;
  reputation?: number;
  publishedAt?: string;
  username?: string;
  id?: string;
  userType?: number;
  jwt?: string;
  description?: string;
  publicKey?: string;
};

class UserPayload extends Payload implements UserData {
  avatarUrl?: string;
  displayName?: string;
  email?: string;
  reputation?: number;
  publishedAt?: string;
  username?: string;
  id?: string;
  userType?: number;
  jwt?: string;
  description?: string;
  publicKey?: string;
}

export class User extends UserPayload {
  constructor(payload: UserPayload) {
    super(payload);
    this.avatarUrl = payload.avatarUrl;
    this.displayName = payload.displayName;
    this.email = payload.email;
    this.reputation = payload.reputation;
    this.publishedAt = payload.publishedAt;
    this.username = payload.username;
    this.id = payload.id;
    this.userType = payload.userType;
    this.jwt = payload.jwt;
    this.description = payload.description;
    this.publicKey = payload.publicKey;
  }

  get isYoutubeChannel(): boolean {
    return this.userType === 0;
  }

  get initials() {
    let initialsArr = this.displayName ? this.displayName.split(" ") : [];
    let firstInitial = initialsArr[0]
      ? initialsArr[0].substr(0, 1).toUpperCase()
      : "";
    let secondInitial = initialsArr[1]
      ? initialsArr[1].substr(0, 1).toUpperCase()
      : "";
    let initials = firstInitial + secondInitial;
    return initials;
  }
}
