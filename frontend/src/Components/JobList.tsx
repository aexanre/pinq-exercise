import { deleteJob } from "../api";

export default function JobList({ jobs, onRefresh }: any) {

    const handleDelete = async (id: string) => {
        await deleteJob(id);
        onRefresh();
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Job List</h2>

            {(!jobs || jobs.length === 0) && <div className="alert alert-info">No jobs yet ! Try to create a new one.</div>}

            {jobs.map((job: any) => (
            
                <div key={job.id} className="card mb-3 shadow-sm">
                    <div className="card-body">
                        <div className="card-title">{job.name}</div>
                        <p className="mb-1">Operation: {job.operation}</p>
                        <p className="mb-1">Input: {JSON.stringify(job.input)}</p>

                        <p className={`badge bg-secondary`}>Status: {job.status}</p>

                        {job.result !== undefined && (
                            <p className="mt-2 text-success">Result: {JSON.stringify(job.result)}</p>
                        )}
                        {job.error !== undefined && (
                            <p className="mt-2 text-danger">Error: {JSON.stringify(job.error)}</p>
                        )}

                        <button className="btn btn-sm btn-danger mt-3" onClick={() => handleDelete(job.id)}>Delete</button>
                    </div>
                </div>
            
            ))}
        </div>
    );
}