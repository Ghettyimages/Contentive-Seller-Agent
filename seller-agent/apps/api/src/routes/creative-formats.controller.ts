import { Controller, Get } from '@nestjs/common';

@Controller('creative-formats')
export class CreativeFormatsController {
  @Get()
  list() {
    return ['banner', 'video'];
  }
}
