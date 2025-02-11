import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post('create')
  async createStore(@Body() body: { ownerId: number; name: string; domain: string }) {
    return this.storesService.createStore(body.ownerId, body.name, body.domain);
  }

  @Get(':storeId')
  async getStoreById(@Param('storeId') storeId: number) {
    return this.storesService.getStoreById(Number(storeId));
  }

  @Put(':storeId/link-mahally')
  async linkToMahally(@Param('storeId') storeId: number) {
    return this.storesService.linkToMahally(Number(storeId));
  }
}
