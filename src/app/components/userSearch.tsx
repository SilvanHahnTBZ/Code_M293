import React, { useState, useRef } from 'react';
import { User } from '../../common';

interface UserSearchProps {
  options: User[];
  onSelect: (selectedUser: User) => void;
}

const UserSearch = ({ options, onSelect }: UserSearchProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSelect = (selectedUser: User) => {
    setInputValue(selectedUser.email);
    onSelect(selectedUser);
    setShowOptions(false);
  };

  const filteredOptions = options.filter(option =>
    option.email.toLowerCase().includes(inputValue.toLowerCase()));

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Person wählen..."
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value);
          setShowOptions(true);
        }}
        onBlur={() => {
          setTimeout(() => setShowOptions(false), 100);
        }}
        ref={inputRef}
        className="block p-2 mx-auto text-black border rounded-2xl w-96"
      />
      {showOptions && inputValue.length > 0 && (
        <ul className="absolute z-10 mt-2 bg-white bg-opacity-90 border text-black
        border-gray-300 rounded-md shadow-md w-96 text-left left-1/2 transform
         -translate-x-1/2 overflow-y-auto max-h-40">
          {filteredOptions.map(person => (
            <li
              key={person.email}
              onClick={() => handleSelect(person)}
              className="px-3 py-1 cursor-pointer hover:bg-gray-200"
            >
              {person.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSearch;
