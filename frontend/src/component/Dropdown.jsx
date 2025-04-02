import { useState } from "react";

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Profile Icon */}
      <div className="w-12 h-12 rounded-full bg-gray-300 cursor-pointer flex items-center justify-center">
        <span className="text-xl font-bold">U</span>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-36 bg-white shadow-lg rounded-lg py-2 border">
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Update
          </button>
          <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
