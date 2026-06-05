import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const app = express();

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.json({
        status: "OK",
        message: "JobHunter API Running",
    });
});

app.get("/api/jobs", async (_req: Request, res: Response) => {
    try {
        const jobs = await prisma.job.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        res.json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({
            error: "Failed to fetch jobs",
        });
    }
});

app.post("/api/jobs", async (req: Request, res: Response) => {
    try {
        const { title, company, location, salary, description, url, matchScore } = req.body;

        if (!title || !company) {
            return res.status(400).json({
                error: "Title and company are required",
            });
        }

        const job = await prisma.job.create({
            data: {
                title,
                company,
                location,
                salary,
                description,
                url,
                matchScore: Number(matchScore) || 80,
            },
        });

        res.status(201).json(job);
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({
            error: "Failed to create job",
        });
    }
});

app.listen(4000, () => {
    console.log("🚀 API running on http://localhost:4000");
});