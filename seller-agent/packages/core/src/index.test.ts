import { describe, it, expect } from 'vitest';
import { ProductSchema } from './index';

describe('ProductSchema', () => {
  it('parses a valid product', () => {
    const product = {
      id: 'p1',
      tenantId: 't1',
      name: 'Homepage Banner',
      floorCpm: 2.5,
      creativeFormats: ['banner'],
    };
    const parsed = ProductSchema.parse(product);
    expect(parsed.name).toBe('Homepage Banner');
  });

  it('rejects invalid floorCpm', () => {
    expect(() =>
      ProductSchema.parse({
        id: 'p1',
        tenantId: 't1',
        name: 'Bad',
        floorCpm: -1,
        creativeFormats: ['banner'],
      }),
    ).toThrow();
  });
});
