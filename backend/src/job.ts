/**
 * Job interface representing a job's operation
 */
export type Operation = 'sum' | 'multiply' | 'reverse_string' | 'count_words';

/**
 * Job interface representing a job's status
 */
export type JobStatus = 'pending' | 'running' | 'completed' | 'failed';

/**
 * Job interface representing a job in the system
 * - id: unique identifier for the job
 * - name: name of the job
 * - operation: the operation to perform (sum, multiply, reverse_string, count_words)
 * - input: the input for the operation (array of numbers for sum/multiply, string for reverse_string/count_words)
 * - status: current status of the job (pending, running, completed, failed)
 * - result: the result of the job execution (only for completed jobs)
 * - error: error message if the job failed
 */
export interface Job {
    id: string;
    name: string;
    operation: Operation;
    input: any;
    status: JobStatus;

    result?: any;
    error?: string;
}