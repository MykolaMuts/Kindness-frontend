import React from 'react';

interface ShowRequestStatusProps {
  type: 'success' | 'error';
  message: string;
}

const ShowRequestStatus: React.FC<ShowRequestStatusProps> = ({ type, message }) => {
  const styles = {
    success: 'text-green-600 bg-green-100 border-green-300',
    error: 'text-red-600 bg-red-100 border-red-300',
  };

  return (
    <div className={`mt-4 p-4 text-sm border rounded ${styles[type]}`}>
      {message}
    </div>
  );
};

export default ShowRequestStatus;