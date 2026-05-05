import { getJobs, saveJobs } from "./store";
import { Job } from "./job";

/**
 * Sleep for given delay
 * @param delay delay of the sleep in ms
 */
function sleep(delay: number) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Execute a job and return the result
 * @param job Job to execute
 */
function executeJob(job: Job): any {
    switch (job.operation) {
        case "sum":
            return job.input.reduce((a: number, b: number) => a + b, 0);
        case "multiply":
            return job.input.reduce((a: number, b: number) => a * b, 1);
        case "reverse_string":
            return job.input.split("").reverse().join("");
        case "count_words":
            return job.input.split(" ").length;
        default:
            throw new Error("Unknown operation");
    }
}

/**
 * Start the worker that will process jobs
 */
export function startWorker() {
    //console.log("Worker started...");
    setInterval(async () => {
        //Get jobs
        const jobs = getJobs();
        
        //Find first pending job
        const jobIndex = jobs.findIndex(j => j.status === "pending");
        if (jobIndex === -1) return;
        const job = jobs[jobIndex];
        
        try {
            //Run
            job.status = "running";
            saveJobs(jobs);

            //Delay
            const delay = 2000 + Math.random() * 6000;
            await sleep(delay);

            //Execute
            const result = executeJob(job);

            //Success
            job.status = "completed";
            (job as any).result = result;

        } catch (err) {
            //Failed
            job.status = "failed";
            (job as any).error = "Execution error";
        }
        //Save
        jobs[jobIndex] = job;
        saveJobs(jobs);
    }, 1000);
}