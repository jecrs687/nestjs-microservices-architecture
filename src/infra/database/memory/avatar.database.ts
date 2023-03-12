import { AvatarRepository } from '@domain/interfaces/database/avatar.interface';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AvatarRepositoryMemory implements AvatarRepository {
  constructor() {}
  avatar: [string, string][] = [];

  async getUserAvatarHash(userId: string): Promise<string> {
    const avatar = this.avatar.find((user) => user[0] == userId);
    if (!avatar) return null;
    return avatar[1];
  }
  async deleteUserAvatar(userId: string): Promise<boolean> {
    const userIndex = this.avatar.findIndex((user) => user[0] === userId);
    if (userIndex === -1) return false;
    this.avatar.splice(userIndex, 1);
    return true;
  }
  async postUserAvatar(userId: string, hash: string): Promise<void> {
    const userIndex = this.avatar.findIndex((user) => user[0] === userId);
    if (userIndex === -1) {
      this.avatar.push([userId, hash]);
      return;
    }
  }
}
