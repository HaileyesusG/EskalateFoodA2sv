import React, { useEffect, useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AdminDashboard = () => {
  const [uncheckedJobs, setUncheckedJobs] = useState([]);
  const [checkedJobs, setCheckedJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const uncheckedRes = await axios.get(
          `${API_BASE_URL}/api/Accepted/jobFetch/false`
        );
        const checkedRes = await axios.get(
          `${API_BASE_URL}/api/Accepted/jobFetch/true`
        );
        setUncheckedJobs(uncheckedRes.data);
        setCheckedJobs(checkedRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, []);

  const handleCheck = async (id) => {
    try {
      const updatedJob = await axios.put(
        `${API_BASE_URL}/api/Accepted/jobUpdate/${id}`
      );
      setUncheckedJobs((prev) => prev.filter((job) => job._id !== id));
      setCheckedJobs((prev) => [...prev, updatedJob.data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Unchecked Jobs</h2>
      <ul>
        {uncheckedJobs.map((job) => (
          <li key={job._id}>
            {job.department} - {job.amount} - {job.customerId?.phone}
            <button onClick={() => handleCheck(job._id)}>Verify</button>
          </li>
        ))}
      </ul>
      <h2>Checked Jobs</h2>
      <ul>
        {checkedJobs.map((job) => (
          <li key={job._id}>
            {job.department} - {job.amount} - {job.customerId?.phone}
          </li>
        ))}
      </ul>
      0
    </div>
  );
};

export default AdminDashboard;
