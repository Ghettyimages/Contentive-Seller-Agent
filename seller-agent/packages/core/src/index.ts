import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  name: z.string(),
  floorCpm: z.number().nonnegative(),
  creativeFormats: z.array(z.string()),
  targeting: z.record(z.any()).optional(),
});
export type Product = z.infer<typeof ProductSchema>;

export const CreativeSpecSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  format: z.string(),
  width: z.number(),
  height: z.number(),
  maxSizeKb: z.number().optional(),
});
export type CreativeSpec = z.infer<typeof CreativeSpecSchema>;

export const MediaBuySchema = z.object({
  id: z.string().optional(),
  tenantId: z.string(),
  productId: z.string(),
  name: z.string(),
  budget: z.number().nonnegative(),
  status: z.enum(['pending', 'approved', 'rejected', 'active', 'paused']).default('pending'),
});
export type MediaBuy = z.infer<typeof MediaBuySchema>;

export const DeliveryReportSchema = z.object({
  mediaBuyId: z.string(),
  range: z.object({ from: z.string(), to: z.string() }),
  impressions: z.number(),
  clicks: z.number(),
  spend: z.number(),
});
export type DeliveryReport = z.infer<typeof DeliveryReportSchema>;

export const AuthorizedPropertySchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  domain: z.string(),
  appName: z.string().optional(),
});
export type AuthorizedProperty = z.infer<typeof AuthorizedPropertySchema>;

export function capabilities() {
  return {
    name: 'Seller Agent',
    version: '0.0.0',
    adapters: ['gam'],
    features: ['media-buys', 'reporting', 'auth', 'licensing'],
  } as const;
}
