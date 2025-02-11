import { Injectable } from '@nestjs/common';

@Injectable()
export class AIChatbotService {
  async getChatbotResponse(userInput: string): Promise<string> {
    const responses = {
      'hello': 'Hello! How can I assist you today?',
      'order status': 'Please provide your order ID to check the status.',
      'support': 'I will connect you to a support agent.',
    };

    return responses[userInput.toLowerCase()] || 'I am not sure about that. Can you clarify?';
  }
}