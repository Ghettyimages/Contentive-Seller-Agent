import { Injectable, NestMiddleware } from '@nestjs/common';
import { verifySignature } from '@contentive/auth';

@Injectable()
export class HmacMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const isBuyerRoute = req.path?.startsWith('/media-buys');
    if (!isBuyerRoute) return next();

    const secret = process.env.API_HMAC_SECRET || '';
    const rawBody = JSON.stringify(req.body || {});
    const valid = verifySignature(req.headers, rawBody, secret, 5 * 60 * 1000);
    if (!valid) {
      res.status(401).json({ error: 'invalid signature' });
      return;
    }
    next();
  }
}
