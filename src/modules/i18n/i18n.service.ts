import { Injectable } from '@nestjs/common';
import * as i18next from 'i18next';
import Backend from 'i18next-fs-backend';

@Injectable()
export class I18nService {
  async init() {
    await i18next.use(Backend).init({
      fallbackLng: 'en',
      lng: 'en',
      backend: {
        loadPath: './locales/{{lng}}.json',
      },
    });
  }

  async translate(key: string, lang: string = 'en'): Promise<string> {
    return i18next.t(key, { lng: lang });
  }
}
