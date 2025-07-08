import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Clear old data
	await prisma.category.deleteMany();
	await prisma.post.deleteMany();
	await prisma.comment.deleteMany();

	// Create Users
	const users = await prisma.category.createMany({
		data: [
			{
				"id": 1,
				"name": "Technology"
			},
			{
				"id": 2,
				"name": "Health"
			},
			{
				"id": 3,
				"name": "Travel"
			}
		],
	});

	// Create Products
	const products = await prisma.post.createMany({
		data: [
			{
				"id": 1,
				"categoryId": 1,
				"title": "The Rise of AI",
				"content": "Artificial Intelligence is transforming industries rapidly.",
				"createdAt": "2025-06-01T10:00:00Z"
			},
			{
				"id": 2,
				"categoryId": 2,
				"title": "10 Tips for a Healthy Lifestyle",
				"content": "Stay hydrated, get enough sleep, and exercise regularly.",
				"createdAt": "2025-06-05T15:30:00Z"
			},
			{
				"id": 3,
				"categoryId": 3,
				"title": "Top 5 Destinations in 2025",
				"content": "Explore these beautiful places this year.",
				"createdAt": "2025-06-10T08:15:00Z"
			}
		],
	});

	// Create Orders
	await prisma.comment.createMany({
		data: [
			{
				"id": 1,
				"postId": 1,
				"message": "Great insights on AI!",
				"createdAt": "2025-06-01T12:00:00Z"
			},
			{
				"id": 2,
				"postId": 2,
				"message": "Very helpful, thanks!",
				"createdAt": "2025-06-05T18:00:00Z"
			},
			{
				"id": 3,
				"postId": 1,
				"message": "Can you also cover machine learning?",
				"createdAt": "2025-06-02T09:00:00Z"
			},
			{
				"id": 4,
				"postId": 3,
				"message": "Looking forward to visiting these places!",
				"createdAt": "2025-06-11T10:45:00Z"
			}
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
