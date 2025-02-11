import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import PDFDocument from 'pdfkit';
import fs from 'fs';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async generateInvoice(orderId: number): Promise<string> {
    const order = await this.ordersRepository.findOne({ where: { id: orderId }, relations: ['customer', 'product'] });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }

    const pdfPath = `./invoices/invoice_${orderId}.pdf`;
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(18).text('فاتورة الشراء', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`رقم الطلب: ${order.id}`);
    doc.text(`التاريخ: ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.text(`العميل: ${order.customer.username}`);
    doc.moveDown();
    doc.text(`المنتج: ${order.product.name}`);
    doc.text(`الكمية: ${order.quantity}`);
    doc.text(`الإجمالي: ${order.totalPrice} ريال`);
    doc.moveDown();
    doc.text('شكراً لاستخدام منصتنا!', { align: 'center' });

    doc.end();

    return pdfPath;
  }
}
