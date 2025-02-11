import { Controller, Post, Body, Param } from '@nestjs/common';
import { UserThemeService } from './user_theme.service';

@Controller('user-theme')
export class UserThemeController {
  constructor(private readonly userThemeService: UserThemeService) {}

  @Post('save/:userId')
  async saveUserTheme(
    @Param('userId') userId: number,
    @Body() body: { customConfig: string; cssConfig: string; jsConfig: string },
  ) {
    return this.userThemeService.saveUserTheme(userId, body.customConfig, body.cssConfig, body.jsConfig);
  }

  @Post('publish/:userId')
  async publishUserTheme(@Param('userId') userId: number) {
    return this.userThemeService.publishUserTheme(userId);
  }

  @Post('reset/:userId')
  async resetUserTheme(@Param('userId') userId: number) {
    return this.userThemeService.resetUserTheme(userId);
  }
}
