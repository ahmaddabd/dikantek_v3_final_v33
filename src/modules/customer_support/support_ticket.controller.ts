import { Controller, Post, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { SupportTicketService } from './support_ticket.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TicketStatus } from './support_ticket.entity';

@Controller('support')
export class SupportTicketController {
  constructor(private readonly supportService: SupportTicketService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createTicket(@Body() body: { userId: number, subject: string, message: string }) {
    return this.supportService.createTicket(body.userId, body.subject, body.message);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  async updateTicketStatus(@Param('id') id: number, @Body() body: { status: TicketStatus }) {
    return this.supportService.updateTicketStatus(id, body.status);
  }

  @Get()
  async getTickets() {
    return this.supportService.getTickets();
  }
}