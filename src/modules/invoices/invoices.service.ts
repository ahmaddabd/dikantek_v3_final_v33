import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { PaymentsService } from '../payments/payments.service';
import { UsersService } from '../users/users.service';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
    private paymentsService: PaymentsService,
    private usersService: UsersService,
  ) {}

  async generateInvoice(userId: number, paymentId: number): Promise<Invoice> {
    const user = await this.usersService.findById(userId);
    const payment = await this.paymentsService.getPaymentById(paymentId);
    if (!user || !payment) throw new NotFoundException('User or payment not found');

    const invoiceNumber = `INV-${Date.now()}`;
    const pdfPath = `./invoices/${invoiceNumber}.pdf`;

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.fontSize(20).text(`فاتورة رقم: ${invoiceNumber}`, { align: 'center' });
    doc.moveDown();
    doc.text(`التاريخ: ${new Date().toLocaleDateString()}`);
    doc.text(`اسم العميل: ${user.username}`);
    doc.text(`المبلغ الإجمالي: ${payment.amount} USD`);
    doc.text(`طريقة الدفع: ${payment.method}`);
    doc.text(`حالة الدفع: ${payment.status}`);
    doc.end();

    const invoice = this.invoicesRepository.create({
      customer: user,
      payment: payment,
      invoiceNumber: invoiceNumber,
      totalAmount: payment.amount,
      pdfUrl: pdfPath,
    });

    return this.invoicesRepository.save(invoice);
  }

  async getInvoices(): Promise<Invoice[]> {
    return this.invoicesRepository.find({ relations: ['customer', 'payment'] });
  }

  async getInvoiceById(id: number): Promise<Invoice> {
    const invoice = await this.invoicesRepository.findOne({ where: { id }, relations: ['customer', 'payment'] });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }
}