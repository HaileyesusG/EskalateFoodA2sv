import React, { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const History = ({ user }) => {
  const token = user ? "Bearer " + user.token : "";
  const [Json, setJson] = useState([]);
  const featcher = async () => {
    const response = await fetch(`${API_BASE_URL}/api/Accepted/GetOneTech`, {
      headers: { authorization: token },
    });
    const d = await response.json();
    setJson(d);
  };
  useEffect(() => {
    featcher();
  }, []);
  return (
    <div className="">
      {Json && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-center text-4xl font-extrabold mb-8 text-gray-800">
            Your Work History
          </h1>
          {Json.map((r, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 mb-6 hover:bg-cyan-50 border border-gray-300 transition-all cursor-pointer"
            >
              <ul className="space-y-4">
                <li className="flex justify-between text-lg">
                  <span className="font-semibold text-gray-700">Earned:</span>
                  <span className="text-gray-900">{r.amount}</span>
                </li>
                <li className="flex justify-between text-lg">
                  <span className="font-semibold text-gray-700">
                    Deducted (10%):
                  </span>
                  <span className="text-gray-900">{r.deducted}</span>
                </li>
                <li className="flex justify-between text-lg">
                  <span className="font-semibold text-gray-700">
                    Customer Name:
                  </span>
                  <span className="text-gray-900">{r.Customer_firstname}</span>
                </li>
                <li className="flex justify-between text-lg">
                  <span className="font-semibold text-gray-700">
                    Customer Phone:
                  </span>
                  <span className="text-gray-900">
                    {r.Customer_phonenumber}
                  </span>
                </li>
                <li className="flex justify-between text-lg">
                  <span className="font-semibold text-gray-700">
                    Customer Location:
                  </span>
                  <span className="text-gray-900">{r.Customer_location}</span>
                </li>
                <li className="flex justify-between text-lg">
                  <span className="font-semibold text-gray-700">Job:</span>
                  <span className="text-gray-900">{r.department}</span>
                </li>
                <li className="text-sm text-gray-500">
                  <span>{new Date(r.createdAt).toLocaleString()}</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
