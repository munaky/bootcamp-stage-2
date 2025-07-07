import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Clear old data
	await prisma.user.deleteMany();

	// Create Users
	const users = await prisma.user.createMany({
		data: [
			{
				name: 'user1',
				email: 'user1@gmail.com',
				points: 3000	
			},
			{
				name: 'user2',
				email: 'user2@gmail.com',
				points: 3000	
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
