import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportTicket, TicketStatus } from './support_ticket.entity';

@Injectable()
export class SupportTicketService {
  constructor(
    @InjectRepository(SupportTicket)
    private supportRepository: Repository<SupportTicket>,
  ) {}

  async createTicket(userId: number, subject: string, message: string): Promise<SupportTicket> {
    const ticket = this.supportRepository.create({ user: { id: userId }, subject, message, status: TicketStatus.OPEN });
    return this.supportRepository.save(ticket);
  }

  async updateTicketStatus(ticketId: number, status: TicketStatus): Promise<SupportTicket> {
    const ticket = await this.supportRepository.findOne({ where: { id: ticketId } });
    if (!ticket) throw new NotFoundException('Ticket not found');

    ticket.status = status;
    return this.supportRepository.save(ticket);
  }

  async getTickets(): Promise<SupportTicket[]> {
    return this.supportRepository.find({ relations: ['user'] });
  }
}