import { Injectable } from '@nestjs/common';

@Injectable()
export class SEOOptimizationService {
  generateMetaTags(title: string, description: string, keywords: string[]) {
    return {
      title,
      description,
      metaTags: keywords.map(keyword => `<meta name="keywords" content="${keyword}">`).join('\n'),
    };
  }
}