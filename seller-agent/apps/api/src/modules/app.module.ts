import { Module, MiddlewareConsumer } from '@nestjs/common';
import { HealthController } from '../routes/health.controller';
import { CapabilitiesController } from '../routes/capabilities.controller';
import { ProductsController } from '../routes/products.controller';
import { AuthorizedPropertiesController } from '../routes/authorized-properties.controller';
import { MediaBuysController } from '../routes/media-buys.controller';
import { WellKnownController } from '../routes/wellknown.controller';
import { CreativeFormatsController } from '../routes/creative-formats.controller';
import { HmacMiddleware } from '../middleware/hmac.middleware';

@Module({
  imports: [],
  controllers: [
    HealthController,
    CapabilitiesController,
    ProductsController,
    AuthorizedPropertiesController,
    MediaBuysController,
    WellKnownController,
    CreativeFormatsController,
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HmacMiddleware).forRoutes('*');
  }
}
