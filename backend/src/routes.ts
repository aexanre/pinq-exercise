import express from "express";
import { getJobs, saveJobs } from "./store";
import { Job } from "./job";

const router = express.Router();

/** 
 * Create a job
 */
router.post("/", (req, res) => {
    const jobs = getJobs();

    const newJob: Job = {
        id: Date.now().toString(), //Simple ID generation
        name: req.body.name,
        operation: req.body.operation,
        input: req.body.input,
        status: "pending"
    };

    jobs.push(newJob);
    saveJobs(jobs);

    res.json(newJob);
});

/**
 * Get all jobs
 */
router.get("/", (req, res) => {
    res.json(getJobs());
});

/**
 * Get a job
 */
router.get("/:id", (req, res) => {
    const job = getJobs().find(j => j.id === req.params.id);
    res.json(job);
});

/**
 * Delete a job
 */
router.delete("/:id", (req, res) => {
    let jobs = getJobs();

    jobs = jobs.filter(j => j.id !== req.params.id);

    saveJobs(jobs);

    res.json({ message: "deleted" });
});

export default router;