import React, { ChangeEvent } from 'react';

export interface DropdownProps {
  label: string;
  id: string;
  name: string;
  options: { value: string; label: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

const Dropdown = ({ label, id, name, options, onChange, value }: DropdownProps) => {
  return (
    <div className="flex flex-col items-start">
      <label className="block text-theme-50 font-secondary font-bold text-lg">
        {label}
      </label>
      <div className="relative mt-2">
        <select
          id={id}
          name={name}
          className={`h-9 rounded-[0.8rem] bg-theme-50 text-theme-300 shadow-md 
          py-1.5 pl-3 sm:leading-6 resize-none w-44`}
          onChange={onChange}
          value={value}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
