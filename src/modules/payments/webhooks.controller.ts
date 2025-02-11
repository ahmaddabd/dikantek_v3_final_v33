import { Controller, Post, Body, Headers } from '@nestjs/common';

@Controller('webhooks')
export class WebhooksController {
  @Post('stripe')
  async handleStripeWebhook(@Body() body: any, @Headers('stripe-signature') signature: string) {
    console.log('Stripe Webhook Received:', body);
    return { received: true };
  }

  @Post('paypal')
  async handlePayPalWebhook(@Body() body: any) {
    console.log('PayPal Webhook Received:', body);
    return { received: true };
  }

  @Post('mada')
  async handleMadaWebhook(@Body() body: any) {
    console.log('Mada Webhook Received:', body);
    return { received: true };
  }
}