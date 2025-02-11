import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import * as path from 'path';

export const I18nConfig = I18nModule.forRoot({
  fallbackLanguage: 'en',
  parser: I18nJsonParser,
  parserOptions: {
    path: path.join(__dirname, '../locales/'),
  },
});