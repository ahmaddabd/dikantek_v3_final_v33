import { Controller, Post, Get, Param, UseGuards, Request, Res } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as fs from 'fs';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':paymentId')
  async generateInvoice(@Request() req, @Param('paymentId') paymentId: number) {
    return this.invoicesService.generateInvoice(req.user.userId, paymentId);
  }

  @Get()
  async getInvoices() {
    return this.invoicesService.getInvoices();
  }

  @Get(':id')
  async getInvoiceById(@Param('id') id: number) {
    return this.invoicesService.getInvoiceById(id);
  }

  @Get(':id/download')
  async downloadInvoice(@Param('id') id: number, @Res() res) {
    const invoice = await this.invoicesService.getInvoiceById(id);
    if (fs.existsSync(invoice.pdfUrl)) {
      res.download(invoice.pdfUrl);
    } else {
      res.status(404).json({ message: 'Invoice file not found' });
    }
  }
}