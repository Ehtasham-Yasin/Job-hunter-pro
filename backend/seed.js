import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const job = await prisma.job.create({
        data: {
            id: "job_google_frontend_001",
            title: "Frontend Developer",
            company: "Google",
            location: "Remote",
            salary: "$120,000",
            description: "React Developer Position",
            matchScore: 95,
            url: "https://careers.google.com",
        },
    });

    console.log(job);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });