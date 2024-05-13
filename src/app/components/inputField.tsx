import React, {ChangeEvent, useState} from 'react';
import { Size } from '../newTask/sizeEnum';

interface InputFieldProps {
    type: 'text' | 'textarea';
    label: string;
    placeholder: string;
    value: string;
    size?: Size;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    name: string;
}

const InputField = ({
  type,
  label,
  onChange,
  name,
  value,
  placeholder,
  size
}: InputFieldProps) => {
  const [ inputValue, setInputValue ] = useState(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e)
    setInputValue(e.target.value);
  };

  return (
    <div className={'flex flex-col'}>
      <label className="block text-theme-50 font-secondary font-bold text-lg">
        {label}
      </label>
      <div className="relative mt-2">
        {type === 'textarea' ? (
          <textarea
            className={`bg-theme-50 rounded-[0.8rem] py-1.5 pl-3 placeholder:text-stone-400 
            sm:text-sm sm:leading-6 shadow-md ${size}`}
            placeholder={placeholder}
            onChange={handleChange}
            value={inputValue}
            name={name}
          />
        ) : (
          <input
            className={`bg-theme-50 rounded-[0.8rem] py-1.5 pl-3 placeholder:text-stone-400 
            sm:text-sm sm:leading-6 shadow-md ${size}`}
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
            value={inputValue}
            name={name}
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
