import React from 'react';

interface SaveButtonProps {
  onClick: () => void;
}

const SaveButton = ({ onClick }: SaveButtonProps) => {
  return (
    <div className="grid place-items-end">
      <button
        className="bg-theme-950 text-theme-50 font-secondary w-32 h-9 rounded-md shadow-lg ml-52"
        onClick={onClick}
      >
        Bestätigen
      </button>
    </div>
  );
};

export default SaveButton
