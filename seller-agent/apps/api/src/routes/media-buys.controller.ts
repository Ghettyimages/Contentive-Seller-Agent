import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('media-buys')
export class MediaBuysController {
  @Post()
  create(@Body() body: any) {
    return { id: 'pending', ...body };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() patch: any) {
    return { id, ...patch };
  }

  @Get(':id/delivery')
  delivery(@Param('id') id: string) {
    return { mediaBuyId: id, impressions: 0, clicks: 0, spend: 0 };
  }
}
