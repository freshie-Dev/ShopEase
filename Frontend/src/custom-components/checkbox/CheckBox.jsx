import React from 'react';
import './CustomCheckbox.css'; // Import your CSS file

const CustomCheckbox = ({ checked, onChange }) => {
  return (
    <label className="container">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <div className="checkmark"></div>
    </label>
  );
};

export default CustomCheckbox;
