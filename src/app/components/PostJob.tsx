import { useState } from "react";
import type { NavProps } from "../types";

export function PostJob({ navigate }: NavProps) {
    const [form, setForm] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        url: "",
        matchScore: 80,
    });

    const [message, setMessage] = useState("");

    const updateField = (key: string, value: string | number) => {
        setForm((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const submitJob = async () => {
        setMessage("");

        const res = await fetch("http://127.0.0.1:4000/api/jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            setMessage("Failed to post job");
            return;
        }

        setMessage("Job posted successfully");

        setForm({
            title: "",
            company: "",
            location: "",
            salary: "",
            description: "",
            url: "",
            matchScore: 80,
        });
    };

    return (
        <div className="flex flex-col flex-1 bg-background min-h-0 px-5 pt-14 pb-6 overflow-y-auto">
            <h1 className="font-bold text-foreground mb-2" style={{ fontSize: "24px" }}>
                Post a Job
            </h1>

            <p className="text-muted-foreground mb-6" style={{ fontSize: "14px" }}>
                Add a job opening to the JobHunter database.
            </p>

            <div className="flex flex-col gap-3">
                <input
                    value={form.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="Job title"
                    className="bg-card border border-border rounded-xl px-4 py-3 text-foreground outline-none"
                />

                <input
                    value={form.company}
                    onChange={(e) => updateField("company", e.target.value)}
                    placeholder="Company name"
                    className="bg-card border border-border rounded-xl px-4 py-3 text-foreground outline-none"
                />

                <input
                    value={form.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    placeholder="Location"
                    className="bg-card border border-border rounded-xl px-4 py-3 text-foreground outline-none"
                />

                <input
                    value={form.salary}
                    onChange={(e) => updateField("salary", e.target.value)}
                    placeholder="Salary"
                    className="bg-card border border-border rounded-xl px-4 py-3 text-foreground outline-none"
                />

                <input
                    value={form.url}
                    onChange={(e) => updateField("url", e.target.value)}
                    placeholder="Job URL"
                    className="bg-card border border-border rounded-xl px-4 py-3 text-foreground outline-none"
                />

                <textarea
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Job description"
                    className="bg-card border border-border rounded-xl px-4 py-3 text-foreground outline-none min-h-32"
                />

                <input
                    type="number"
                    value={form.matchScore}
                    onChange={(e) => updateField("matchScore", Number(e.target.value))}
                    placeholder="Match score"
                    className="bg-card border border-border rounded-xl px-4 py-3 text-foreground outline-none"
                />

                <button
                    onClick={submitJob}
                    className="bg-primary text-white rounded-xl py-3 font-semibold mt-2"
                >
                    Post Job
                </button>

                {message && (
                    <p className="text-center text-primary font-semibold mt-2">
                        {message}
                    </p>
                )}

                <button
                    onClick={() => navigate("jobs")}
                    className="text-muted-foreground mt-2"
                >
                    Back to Jobs
                </button>
            </div>
        </div>
    );
}