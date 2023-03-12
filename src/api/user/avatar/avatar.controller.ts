import { TransformInterceptor } from '@decoratos/interceptor.decorator';
import { AvatarService } from '@domain/services/avatar.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { AvatarResponseDto } from './avatar.dto';

@UseInterceptors(TransformInterceptor)
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
