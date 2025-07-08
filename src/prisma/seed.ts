import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear old data
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const users = await prisma.user.createMany({
    data: [
      { "name": "Zayden", "email": "zayden@example.com" },
  { "name": "Liora", "email": "liora@example.com" },
  { "name": "Kairo", "email": "kairo@example.com" },
  { "name": "Ember", "email": "ember@example.com" },
  { "name": "Nyx", "email": "nyx@example.com" },
    ],
  });

  // Create Products
  const products = await prisma.product.createMany({
    data: [
      { "name": "Motherboard", "price": 2200000, "stock": 14 },
  { "name": "Processor", "price": 5700000, "stock": 7 },
  { "name": "RAM", "price": 1100000, "stock": 25 },
  { "name": "SSD", "price": 1400000, "stock": 18 },
  { "name": "Graphics Card", "price": 9800000, "stock": 4 },
  { "name": "PC Case", "price": 750000, "stock": 11 },
  { "name": "Power Supply", "price": 1600000, "stock": 9 },
    ],
  });

  // Create Orders
  await prisma.order.createMany({
    data: [
      { userId: 1, productId: 1, quantity: 1 },
      { userId: 1, productId: 2, quantity: 1 },
      { userId: 1, productId: 3, quantity: 1 },
      { userId: 2, productId: 4, quantity: 1 },
    ],
  });
}

main()
  .then(() => {
    console.log("Seeding completed ✅");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
