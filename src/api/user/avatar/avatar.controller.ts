import { AvatarService } from '@domain/services/avatar.service';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AvatarResponseDto } from './avatar.dto';

@Controller('/api/user/:id/avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Delete()
  async deleteUserAvatar(@Param() { id }): Promise<boolean> {
    return this.avatarService.deleteUserAvatar(id);
  }

  @Get()
  async getUserAvatar(@Param() { id }): Promise<AvatarResponseDto> {
    const avatar = await this.avatarService.getUserAvatar(id);
    return {
      avatar,
    };
  }
}
