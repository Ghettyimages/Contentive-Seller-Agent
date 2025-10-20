import { Controller, Get } from '@nestjs/common';

@Controller('authorized-properties')
export class AuthorizedPropertiesController {
  @Get()
  list() {
    return [];
  }
}
