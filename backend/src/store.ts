import fs from "fs";
import { Job } from "./job";

const FILE = "./src/jobs.json";

/**
 * Init file if absent
 */
export function initStore() {
    if (!fs.existsSync(FILE)) {
        fs.writeFileSync(FILE, "[]");
    }
}

/**
 * Get all jobs
 * @returns Jobs in JSON format
 */
export function getJobs(): Job[] {
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

/**
 * Save jobs
 * @param jobs 
 */
export function saveJobs(jobs: Job[]) {
    fs.writeFileSync(FILE, JSON.stringify(jobs, null, 2));
}