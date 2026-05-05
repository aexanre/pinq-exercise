# pinq-exercise
# Job Runner – Fullstack Technical Exercise
This project is a simplified “Job Runner” platform where users can submit jobs, track their execution status, and retrieve results or errors.

---

## How to run the application
### Backend
Open a terminal:
- cd backend 
- npm install
- npm run dev

### Frontend
Open another terminal:
- cd frontend 
- npm install
- npm run dev

---

## Stack choices
### Backend
- Node.js
- Express
- TypeScript
- File-based persistence (JSON)

I chose this stack because I am comfortable with TypeScript and it allows for fast development while keeping type safety.
JSON for simplicity of the database and due to lack of time.

### Frontend
- React
- TypeScript
- Bootstrap

React provides a simple and efficient way to manage UI state, and Bootstrap was used to quickly improve UI clarity without spending too much time on design. I used Vite to quickly bootstrap the frontend and focus on implementing features within the time constraints.


Additionally, I wanted to take this opportunity to practice React and reinforce my TypeScript skills.

---

## Real-time strategy
I implemented a polling-based approach.

The frontend fetches the list of jobs every 2 seconds using `setInterval`.

### Why polling?
- Simple to implement within the time constraints
- No need for complex infrastructure (WebSockets / SSE)
- Sufficient to simulate near real-time updates for this use case

---

## Backend Architecture

The backend is organized as follows:

- `routes.ts` → API endpoints
- `store.ts` → JSON file persistence
- `worker.ts` → asynchronous job processing
- `job.ts` → job data model

Jobs are stored in a JSON file to persist data across server restarts.

---

## Data Model

A Job is defined as:
- `id: string`
- `name: string`
- `operation: JobOperation`
- `input: any`
- `status: JobStatus`
- `result?: any`
- `error?: string`

Using the following enums:
- `JobOperation : "sum" | "multiply" | "reverse_string" | "count_words"`
- `JobStatus: "pending" | "running" | "completed" | "failed"`

---

## Error handling
- Invalid operations are handled in the worker and marked as "failed"
- Errors are stored in the job object
- The frontend displays error messages when present

Basic validation is handled on the frontend to prevent invalid inputs.

---

## Improvements, Trade-offs & Next Priorities

### Trade-offs made
- Used a JSON file instead of a real database for simplicity and speed
- Implemented a simple asynchronous worker instead of a full queue system
- Word counting is implemented using a simple space-based split; we should instead put each word into an array and look at its length.

The current worker processes one job at a time, which keeps the implementation simple but limits scalability.

### Improvements with more time
- Use a real database
- Add tests
- Improve worker with a proper queue system
- Add retry logic with a max-retry count for failed jobs

### Next priorities
- Fix the worker
- Job cancellation
- Filtering/search
- Job history logs

--- 

## Features not implemented
- Cancel a pending job
- Dockerfile
- Tests
- Retry logic
- Job state transition logs
- Filtering/search

