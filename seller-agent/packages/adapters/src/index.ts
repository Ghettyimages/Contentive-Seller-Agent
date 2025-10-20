import type { MediaBuy } from '@contentive/core';

export interface IAdServerAdapter {
  createOrderLineItems(mediaBuy: MediaBuy): Promise<{ externalId: string }>;
  updateOrderLineItems(mediaBuyId: string, patch: Partial<MediaBuy>): Promise<void>;
  fetchDelivery(mediaBuyId: string, range: { from: string; to: string }): Promise<unknown>;
  listInventory(): Promise<string[]>;
  listCreativeFormats(): Promise<string[]>;
}

export interface GAMAdapterConfig {
  networkCode: string;
  applicationName?: string;
  credentialsJson?: string; // TODO: service account creds for GAM API
}

export class GAMAdapter implements IAdServerAdapter {
  constructor(private readonly config: GAMAdapterConfig) {}

  async createOrderLineItems(mediaBuy: MediaBuy) {
    // TODO: implement GAM order/line item creation
    return { externalId: 'stub' };
  }

  async updateOrderLineItems(mediaBuyId: string, patch: Partial<MediaBuy>) {
    // TODO: implement update
  }

  async fetchDelivery(mediaBuyId: string, range: { from: string; to: string }) {
    // TODO: fetch GAM delivery
    return { mediaBuyId, range, impressions: 0, clicks: 0, spend: 0 };
  }

  async listInventory() {
    // TODO: fetch inventory
    return [];
  }

  async listCreativeFormats() {
    // TODO: fetch supported formats
    return ['banner', 'video'];
  }
}
