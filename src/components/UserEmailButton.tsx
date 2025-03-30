import React, { useState } from 'react';

interface UserEmailButtonProps {
  email: string;
};

const UserEmailButton: React.FC<UserEmailButtonProps> = ({email}) => {
  const [showEmail, setShowEmail] = useState<boolean>(false);

  const handleShowEmail = () => {
    try {
      if(!showEmail) {
        navigator.clipboard.writeText(email);
        alert('Email copied to clipboard!'); // Optional: Notify the user
      }
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
    setShowEmail(!showEmail);

  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleShowEmail}
        className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white transition-colors duration-300"
      >
        {showEmail ? 'Hide Email' : 'Show Email'}
      </button>

      {showEmail && (
        <p className="text-sm text-gray-500">email: {email}</p>
      )}
    </div>
  );
};

export default UserEmailButton;