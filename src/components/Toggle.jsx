import React from 'react';

export default function Toggle({ isOn, onToggle, labelOn = "Show Liked", labelOff = "Show All" }) {
  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <input 
        type="checkbox" 
        checked={isOn} 
        onChange={onToggle} 
        className="sr-only" 
        aria-checked={isOn}
      />
      
      {/* Toggle track */}
      <div
        className={`w-12 h-6 rounded-full transition-colors duration-300
          ${isOn ? 'bg-blue-600' : 'bg-gray-300'}`}
      />
      
      {/* Toggle thumb */}
      <div
        className={`absolute left-0 top-0 mt-0.5 ml-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
          ${isOn ? 'translate-x-6' : 'translate-x-0'}`}
      />

      {/* Label */}
      <span className="ml-3 text-gray-900 font-medium select-none">
        {isOn ? labelOn : labelOff}
      </span>
    </label>
  );
}
