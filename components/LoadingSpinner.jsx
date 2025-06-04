"use client";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className="spinner_9y7u"
          x="1"
          y="1"
          rx="1"
          width="10"
          height="10"
        />
        <rect
          className="spinner_9y7u spinner_DF2s"
          x="1"
          y="1"
          rx="1"
          width="10"
          height="10"
        />
        <rect
          className="spinner_9y7u spinner_q27e"
          x="1"
          y="1"
          rx="1"
          width="10"
          height="10"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;