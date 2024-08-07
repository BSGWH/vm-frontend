"use client";

import React from "react";

interface Service {
  name: string;
  questions: string[];
}

interface ServiceDetailsProps {
  service: Service;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service }) => {
  return (
    <div className="bg-white p-6 bg:white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">{service.name}</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Customer questions</h3>
        <p className="text-gray-600 mb-4">
          Every customer answers this series of questions, allowing you to
          define exactly which type of leads you see.
        </p>
        {service.questions.map((question, index) => (
          <div key={index} className="mb-2">
            <button className="w-full text-left p-3 bg-gray-100 hover:bg-gray-200 rounded flex justify-between items-center">
              <span>
                {index + 1}. {question}
              </span>
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <p className="text-blue-600 hover:text-blue-800 cursor-pointer">
          Suggest a question
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Your locations</h3>
        <div className="flex items-center">
          <input type="checkbox" id="location" className="mr-2" checked />
          <label htmlFor="location">Within 150 miles of 02125</label>
        </div>
        <button className="text-blue-600 hover:text-blue-800 mt-2">
          + Add a location
        </button>
      </div>
      <div className="flex justify-between">
        <button className="text-red-600 hover:text-red-800">
          Remove this service
        </button>
        <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
          Save
        </button>
      </div>
    </div>
  );
};

export default ServiceDetails;
