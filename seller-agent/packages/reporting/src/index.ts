import { DeliveryReportSchema, type DeliveryReport } from '@contentive/core';

export function normalizeGAMReport(raw: any): DeliveryReport {
  const report: DeliveryReport = {
    mediaBuyId: String(raw.mediaBuyId ?? raw.orderId ?? 'unknown'),
    range: { from: String(raw.from ?? raw.startDate), to: String(raw.to ?? raw.endDate) },
    impressions: Number(raw.impressions ?? 0),
    clicks: Number(raw.clicks ?? 0),
    spend: Number(raw.spend ?? 0),
  };
  return DeliveryReportSchema.parse(report);
}
