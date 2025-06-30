import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
    // Clear old data
    await prisma.book.deleteMany();

    // Create Users
    const book = await prisma.book.createMany({
        data: [
            {
                id: 1,
                name: 'Book1',
            },
            {
                id: 2,
                name: 'Book2',
            },
            {
                id: 3,
                name: 'Book3',
            },
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
