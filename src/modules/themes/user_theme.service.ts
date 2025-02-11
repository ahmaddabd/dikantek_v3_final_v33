import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTheme } from './user_theme.entity';

@Injectable()
export class UserThemeService {
  constructor(
    @InjectRepository(UserTheme)
    private userThemesRepository: Repository<UserTheme>,
  ) {}

  async getUserTheme(userId: number): Promise<UserTheme> {
    return this.userThemesRepository.findOne({ where: { user: userId } });
  }

  async updateUserTheme(userId: number, customConfig: string, cssConfig: string, jsConfig: string): Promise<UserTheme> {
    const userTheme = await this.getUserTheme(userId);

    if (userTheme) {
      userTheme.customConfig = customConfig;
      userTheme.cssConfig = cssConfig;
      userTheme.jsConfig = jsConfig;
      return this.userThemesRepository.save(userTheme);
    }

    throw new Error('User theme not found');
  }

  async publishUserTheme(userId: number): Promise<UserTheme> {
    const userTheme = await this.getUserTheme(userId);
    if (userTheme) {
      userTheme.isPublished = true;
      return this.userThemesRepository.save(userTheme);
    }
    throw new Error('User theme not found');
  }
}


  async saveUserTheme(userId: number, customConfig: string, cssConfig: string, jsConfig: string): Promise<UserTheme> {
    let userTheme = await this.getUserTheme(userId);

    if (!userTheme) {
      userTheme = this.userThemesRepository.create({
        user: { id: userId },
        customConfig,
        cssConfig,
        jsConfig,
        isPublished: false,
      });
    } else {
      userTheme.customConfig = customConfig;
      userTheme.cssConfig = cssConfig;
      userTheme.jsConfig = jsConfig;
    }

    return this.userThemesRepository.save(userTheme);
  }

  async resetUserTheme(userId: number): Promise<UserTheme> {
    let userTheme = await this.getUserTheme(userId);
    if (userTheme) {
      userTheme.customConfig = '{}';
      userTheme.cssConfig = '';
      userTheme.jsConfig = '';
      userTheme.isPublished = false;
      return this.userThemesRepository.save(userTheme);
    }
    throw new Error('User theme not found');
  }
