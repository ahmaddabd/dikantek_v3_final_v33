import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription, SubscriptionPlan } from './subscription.entity';
import { PaymentsService } from '../payments/payments.service';
import { Store } from '../stores/store.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    private paymentsService: PaymentsService,
  ) {}

  async createSubscription(userId: number, storeId: number, plan: SubscriptionPlan, paymentId: number): Promise<Subscription> {
    const store = await this.storesRepository.findOne({ where: { id: storeId } });
    if (!store) throw new NotFoundException('Store not found');

    const payment = await this.paymentsService.getPaymentById(paymentId);
    if (!payment) throw new NotFoundException('Payment not found');

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + 1); // اشتراك شهري

    const subscription = this.subscriptionsRepository.create({ user: { id: userId }, store, plan, isActive: true, startDate, endDate });
    return this.subscriptionsRepository.save(subscription);
  }

  async getSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionsRepository.find({ relations: ['user', 'store'] });
  }

  async upgradeSubscription(subscriptionId: number, newPlan: SubscriptionPlan): Promise<Subscription> {
    const subscription = await this.subscriptionsRepository.findOne({ where: { id: subscriptionId } });
    if (!subscription) throw new NotFoundException('Subscription not found');

    subscription.plan = newPlan;
    return this.subscriptionsRepository.save(subscription);
  }

  async cancelSubscription(subscriptionId: number): Promise<boolean> {
    const subscription = await this.subscriptionsRepository.findOne({ where: { id: subscriptionId } });
    if (!subscription) throw new NotFoundException('Subscription not found');

    await this.subscriptionsRepository.remove(subscription);
    return true;
  }
}