import { Controller, Get } from '@nestjs/common';

@Controller('.well-known')
export class WellKnownController {
  @Get('adagents.json')
  doc() {
    return {
      tenant: 'Demo Tenant',
      jwk: { kty: 'oct', kid: 'placeholder' },
      contact: 'https://example.com/contact',
      capabilities: {
        adapters: ['gam'],
        features: ['media-buys', 'reporting', 'auth', 'licensing'],
      },
      authorized_properties: [],
      last_updated: new Date().toISOString(),
    };
  }
}
