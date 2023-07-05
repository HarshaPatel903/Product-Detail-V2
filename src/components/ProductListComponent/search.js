import React, { useState } from 'react';
import './search.css';

const ProductSearch = ({ products,handleSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearchChanges = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearchChange(query,query)
  };

  return (

<div className='mainSearch'>

    <div className="search-bar">
  <input type="text" className="search-input" placeholder="Search..."
          onChange={handleSearchChanges}
          value={searchQuery}
          
          />
  <button className="search-button">Search</button>
</div>
          </div>



    // <div>
    //   <input
    //     type="text"
    //     placeholder="Search products..."
    //     value={searchQuery}
    //     onChange={handleSearchChanges}
    //   />
    // </div>
  );
};

export default ProductSearch;