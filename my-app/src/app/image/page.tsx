import React from "react";

const Card = () => {
  return (
    <div className="max-w-xs mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center">
        {/* Image with two concentric circles and a gap */}
        <div className="relative flex items-center justify-center">
          {/* Outer circle with a larger scale */}
          <div className="absolute rounded-full border-4 border-gray-300 transform scale-125"></div>
          {/* Middle circle to create a gap */}
          <div className="absolute rounded-full border-4 border-gray-200 transform scale-115"></div>
          {/* Profile Image with a slightly smaller scale to create a gap */}
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 transform scale-100">
            <img
              src="./photo.jpg" 
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Member Details */}
        <div className="text-center mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Thakur</h3>
          <p className="text-sm text-gray-600">Lab</p>
          <p className="text-xs text-gray-500 mt-1">Frontend Intern</p>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-gray-300 my-4"></div>

        {/* Product Information */}
        <div className="text-center">
          <span className="inline-block w-full h-px bg-gray-300 mb-2"></span>
          <p className="text-xs font-light text-gray-600 bg-gray-100 py-2 rounded-full">
            Engineering
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
