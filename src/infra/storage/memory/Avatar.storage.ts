import { AvatarStorage } from '@domain/interfaces/storage/avatar.storage';
import { Injectable } from '@nestjs/common';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';

@Injectable()
export class AvatarStorageMemory implements AvatarStorage {
  constructor() {}
  async getImageOnBase64(hashId: string) {
    const avatarFile = readFileSync(`./assets/avatar/${hashId}.png`, 'utf-8');
    return avatarFile;
  }
  async saveImageOnBase64(hashId: string, image: string) {
    writeFileSync(`./assets/avatar/${hashId}.png`, image, {
      encoding: 'utf-8',
    });
    return hashId;
  }
  async removeImage(hashId: string) {
    unlinkSync(`./assets/avatar/${hashId}.png`);
  }
}
