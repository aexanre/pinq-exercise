const API_URL = "http://localhost:3000/jobs";

export async function getJobs() {
    const res = await fetch(API_URL);
    
    return res.json();
}

export async function createJob(job: any) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job)
    });

    return res.json();
}

export const deleteJob = async (id: string) => {
    const res = await fetch(`http://localhost:3000/jobs/${id}`, {
        method: "DELETE",
    });

    return res.json();
};