import type { NavProps } from "../types";

export function RoleSelect({ navigate }: NavProps) {
    return (
        <div className="flex flex-col flex-1 bg-background px-5 pt-20 pb-8">
            <div className="text-center mb-10">
                <h1
                    className="font-bold text-foreground mb-3"
                    style={{ fontSize: "28px" }}
                >
                    Welcome to JobHunter Pro
                </h1>

                <p
                    className="text-muted-foreground"
                    style={{ fontSize: "14px" }}
                >
                    Choose how you want to use the platform
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <button
                    onClick={() => navigate("home")}
                    className="bg-primary text-white rounded-2xl p-5 text-left"
                >
                    <p className="font-bold mb-2" style={{ fontSize: "18px" }}>
                        🔍 Job Seeker
                    </p>

                    <p style={{ fontSize: "13px" }}>
                        Search jobs, track applications, prepare for interviews
                    </p>
                </button>

                <button
                    onClick={() => navigate("recruiterDashboard")}
                    className="bg-card border border-border rounded-2xl p-5 text-left"
                >
                    <p className="font-bold mb-2" style={{ fontSize: "18px" }}>
                        🏢 Recruiter
                    </p>

                    <p
                        className="text-muted-foreground"
                        style={{ fontSize: "13px" }}
                    >
                        Post jobs, manage applicants, and hire talent
                    </p>
                </button>
            </div>
        </div>
    );
}