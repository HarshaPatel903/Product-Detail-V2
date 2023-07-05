import React, { useState } from 'react';
import './sortDropDown.css';

const SortDropdown = ({ onSortChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSortChange(selectedValue);
  };

  return (
    <div className="sort-dropdown">
      <select value={selectedOption} onChange={handleSortChange}>
        <option value="">Sort By</option>
        <option value="priceHighToLow">Sort by Price (High to Low)</option>
        <option value="priceLowToHigh">Sort by Price (Low to High)</option>
        <option value="nameAsc">Sort by Name (Ascending)</option>
        <option value="nameDesc">Sort by Name (Descending)</option>
      </select>
    </div>
  );
};

export default SortDropdown;