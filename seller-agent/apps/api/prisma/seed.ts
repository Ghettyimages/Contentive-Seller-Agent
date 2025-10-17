import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { id: 'demo-tenant' },
    update: {},
    create: { id: 'demo-tenant', name: 'Demo Tenant' },
  });

  const apiKey = await prisma.apiKey.upsert({
    where: { key: 'demo-api-key' },
    update: {},
    create: { tenantId: tenant.id, key: 'demo-api-key' },
  });

  const [p1, p2, p3] = await Promise.all([
    prisma.product.create({
      data: {
        tenantId: tenant.id,
        name: 'Homepage Banner',
        floorCpm: 2.5,
        creativeFormats: ['banner'],
      },
    }),
    prisma.product.create({
      data: {
        tenantId: tenant.id,
        name: 'Article Inline',
        floorCpm: 1.2,
        creativeFormats: ['banner'],
      },
    }),
    prisma.product.create({
      data: {
        tenantId: tenant.id,
        name: 'Pre-roll Video',
        floorCpm: 8.0,
        creativeFormats: ['video'],
      },
    }),
  ]);

  await prisma.creativeSpec.createMany({
    data: [
      { tenantId: tenant.id, format: 'banner', width: 300, height: 250, maxSizeKb: 200 },
      { tenantId: tenant.id, format: 'banner', width: 728, height: 90, maxSizeKb: 200 },
      { tenantId: tenant.id, format: 'video', width: 1920, height: 1080 },
    ],
    skipDuplicates: true,
  });

  await prisma.authorizedProperty.upsert({
    where: { id: 'demo-property' },
    update: {},
    create: { id: 'demo-property', tenantId: tenant.id, domain: 'example.com', appName: 'web' },
  });

  await prisma.mediaBuy.create({
    data: {
      tenantId: tenant.id,
      productId: p1.id,
      name: 'Demo Pending Buy',
      budget: 1000,
      status: 'pending',
    },
  });

  console.log('Seed complete. Tenant:', tenant.id, 'API Key:', apiKey.key);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
