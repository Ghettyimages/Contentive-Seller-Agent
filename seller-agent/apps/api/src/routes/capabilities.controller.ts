import { Controller, Get } from '@nestjs/common';

@Controller('capabilities')
export class CapabilitiesController {
  @Get()
  list() {
    return {
      product: 'Seller Agent',
      version: '0.0.0',
      capabilities: {
        adapters: ['gam'],
        features: ['media-buys', 'reporting', 'auth', 'licensing'],
      },
    };
  }
}
