import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class PaymentGatewayService {
  constructor(private readonly httpService: HttpService) {}

  async processStripePayment(amount: number, currency: string, token: string): Promise<any> {
    return this.httpService.post('https://api.stripe.com/v1/charges', {
      amount: amount * 100, // تحويل المبلغ إلى سنتات
      currency,
      source: token,
    }, { headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` } }).toPromise();
  }

  async processPayPalPayment(orderId: string): Promise<any> {
    return this.httpService.post(`https://api-m.paypal.com/v2/checkout/orders/${orderId}/capture`, {}, {
      headers: { Authorization: `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}` },
    }).toPromise();
  }

  async processMadaPayment(amount: number, cardNumber: string): Promise<any> {
    return this.httpService.post('https://mada-api.com/pay', { amount, cardNumber }, {
      headers: { Authorization: `Bearer ${process.env.MADA_SECRET_KEY}` },
    }).toPromise();
  }
}