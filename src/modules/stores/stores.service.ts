import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  async createStore(ownerId: number, name: string, domain: string) {
    const store = this.storesRepository.create({ ownerId, name, domain, isSyncedWithMahally: false });
    return this.storesRepository.save(store);
  }

  async getStoreById(storeId: number) {
    return this.storesRepository.findOne({ where: { id: storeId } });
  }

  async linkToMahally(storeId: number) {
    const store = await this.getStoreById(storeId);
    if (!store) throw new Error('Store not found');
    
    store.isSyncedWithMahally = true;
    return this.storesRepository.save(store);
  }
}
