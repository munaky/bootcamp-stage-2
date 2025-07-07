import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create suppliers
  const supplierA = await prisma.supplier.create({ data: { name: 'Supplier A' } })
  const supplierB = await prisma.supplier.create({ data: { name: 'Supplier B' } })
  const supplierC = await prisma.supplier.create({ data: { name: 'Supplier C' } })

  // Create product 1
  const product1 = await prisma.product.create({ data: { name: 'Product 1' } })
  await prisma.stock.create({ data: { stock: 33, productId: product1.id, supplierId: supplierA.id } })
  await prisma.stock.create({ data: { stock: 33, productId: product1.id, supplierId: supplierB.id } })
  await prisma.stock.create({ data: { stock: 33, productId: product1.id, supplierId: supplierC.id } })

  // Create product 2
  const product2 = await prisma.product.create({ data: { name: 'Product 2' } })
  await prisma.stock.create({ data: { stock: 33, productId: product2.id, supplierId: supplierA.id } })
  await prisma.stock.create({ data: { stock: 33, productId: product2.id, supplierId: supplierB.id } })
  await prisma.stock.create({ data: { stock: 33, productId: product2.id, supplierId: supplierC.id } })

  // Create product 3
  const product3 = await prisma.product.create({ data: { name: 'Product 3' } })
  await prisma.stock.create({ data: { stock: 33, productId: product3.id, supplierId: supplierA.id } })
  await prisma.stock.create({ data: { stock: 33, productId: product3.id, supplierId: supplierB.id } })
  await prisma.stock.create({ data: { stock: 33, productId: product3.id, supplierId: supplierC.id } })

  // Create product 4
  const product4 = await prisma.product.create({ data: { name: 'Product 4' } })
  await prisma.stock.create({ data: { stock: 33, productId: product4.id, supplierId: supplierA.id } })
  await prisma.stock.create({ data: { stock: 33, productId: product4.id, supplierId: supplierB.id } })
  await prisma.stock.create({ data: { stock: 33, productId: product4.id, supplierId: supplierC.id } })

  // Create product 5
  const product5 = await prisma.product.create({ data: { name: 'Product 5' } })
  await prisma.stock.create({ data: { stock: 33, productId: product5.id, supplierId: supplierA.id } })
  await prisma.stock.create({ data: { stock: 33, productId: product5.id, supplierId: supplierB.id } })
  await prisma.stock.create({ data: { stock: 33, productId: product5.id, supplierId: supplierC.id } })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
