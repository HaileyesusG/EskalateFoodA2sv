import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCircleCheck } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AdminDashboard = () => {
  const [uncheckedJobs, setUncheckedJobs] = useState([]);
  const [checkedJobs, setCheckedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState({});
  const fetchJobs = async () => {
    setLoading(true);
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
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(() => {
      fetchJobs();
    }, 1 * 60 * 1000); // 5 minutes in milliseconds

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleCheck = async (id, amount) => {
    setButtonLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const updatedJob = await axios.put(
        `${API_BASE_URL}/api/Accepted/jobUpdate/${id}`,
        {
          amount: amount,
        }
      );
      setUncheckedJobs((prev) => prev.filter((job) => job._id !== id));
      setCheckedJobs((prev) => [...prev, updatedJob.data]);
    } catch (err) {
      console.error(err);
    } finally {
      setButtonLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Admin Dashboard
        </h1>
      </div>

      {/* Unchecked Jobs Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Unchecked Jobs
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <ClipLoader color="#36d7b7" size={50} />
          </div>
        ) : uncheckedJobs.length === 0 ? (
          <p className="text-gray-600 text-center">
            No uncheckedJobs available
          </p>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-4">
            <ul className="space-y-4">
              {uncheckedJobs.map((job) => (
                <li
                  key={job._id}
                  className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-4 last:border-none"
                >
                  <div className="text-sm text-gray-600 mt-2 md:mt-0">
                    <p className="font-medium text-gray-800">Customer Phone:</p>
                    <p>{job.Customer_phonenumber}</p>
                    <p className="font-medium text-gray-800">
                      Customer Name: {job.Customer_firstname}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 mt-2 md:mt-0">
                    <p className="font-medium text-gray-800">Department:</p>
                    <p>{job.department}</p>
                    <p className="text-gray-500">Amount: ${job.amount}</p>
                  </div>
                  <div className="text-sm text-gray-600 mt-2 md:mt-0">
                    <p className="font-medium text-gray-800">
                      Technician Phone:
                    </p>
                    <p>{job.Tech_phonenumber}</p>
                    <p className="font-medium text-gray-800">
                      Tech Name: {job.Technician_firstname}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCheck(job._id, job.amount)}
                    disabled={buttonLoading[job._id]} // Disable the button while loading
                    className={`mt-4 md:mt-0 md:ml-4 px-4 py-2 rounded-lg transition ${
                      buttonLoading[job._id]
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {buttonLoading[job._id] ? (
                      <div className="flex items-center justify-center">
                        <ClipLoader color="#36d7b7" size={30} />
                        Verifying...
                      </div>
                    ) : (
                      "Verify"
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Checked Jobs Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Checked Jobs
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <ClipLoader color="#36d7b7" size={50} />
          </div>
        ) : checkedJobs.length === 0 ? (
          <p className="text-gray-600 text-center">
            No uncheckedJobs available
          </p>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-4">
            <ul className="space-y-4">
              {checkedJobs.map((job) => (
                <li
                  key={job._id}
                  className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-4 last:border-none"
                >
                  <div className="text-sm text-gray-600 mt-2 md:mt-0">
                    <p className="font-medium text-gray-800">Customer Phone:</p>
                    <p>{job.Customer_phonenumber}</p>
                    <p className="font-medium text-gray-800">
                      Customer Name: {job.Customer_firstname}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 mt-2 md:mt-0">
                    <p className="font-medium text-gray-800">Department:</p>
                    <p>{job.department}</p>
                    <p className="text-gray-500">Amount: ${job.amount}</p>
                  </div>
                  <div className="text-sm text-gray-600 mt-2 md:mt-0">
                    <p className="font-medium text-gray-800">
                      Technician Phone:
                    </p>
                    <p>{job.Tech_phonenumber}</p>
                    <p className="font-medium text-gray-800">
                      Tech Name: {job.Technician_firstname}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-4 px-4 py-2  text-white rounded-lg  transition">
                    <FaCircleCheck className="text-green-500 text-2xl" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
