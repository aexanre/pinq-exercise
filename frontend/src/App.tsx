import { useEffect, useState } from "react";
import { getJobs } from "./api";
import JobForm from "./Components/JobForm";
import JobList from "./Components/JobList";

function App() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const data = await getJobs();
    setJobs(data);
  }

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 2000);
    return () => clearInterval(interval);
  } , []);

  return (
    <div className="App">
      <h1>Job Queue</h1>
      <JobForm onCreated={fetchJobs} />
      <JobList jobs={jobs} onRefresh={fetchJobs}/>
    </div>
  );
}

export default App
