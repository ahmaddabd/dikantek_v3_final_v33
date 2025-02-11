import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('products')
  async searchProducts(@Query('keyword') keyword: string, @Query('minPrice') minPrice?: number, @Query('maxPrice') maxPrice?: number) {
    return this.searchService.searchProducts(keyword, minPrice, maxPrice);
  }

  @Get('stores')
  async searchStores(@Query('keyword') keyword: string) {
    return this.searchService.searchStores(keyword);
  }
}