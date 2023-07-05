import React, { useState,useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Person4Icon from '@mui/icons-material/Person4';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../assets/dogncat.jpeg';

import './Header.css';


const Header = ({count, adddToCart, setAdddToCart}) => {

  const [showPopUp, setShowPopUp] = useState(false);
  useEffect(() => {
    if(adddToCart){
      setShowPopUp(true); 
      const timers = setTimeout(()=>{
        setShowPopUp(false);
        setAdddToCart(false)
      },1000);
    return () => {
      clearTimeout(timers);
    };
  }
  }, [adddToCart]);
  return (
    <header className="header">
      <img onClick={()=>{
            window.location.href = `/`;

      }} className="header__logo" alt='' src={logo}/>
      <div className="header__search">
        <input type="text" placeholder="Search" />
        <button className="header__search-icon">
          <SearchIcon  style={{marginTop:2, color:'black'}}/>
        </button>
      </div>
      <div className="header__profile">
        <Person4Icon />
      </div>
      <div className="header__cart">
        <div className="header__cart_count">
            {count}
        </div>
        {showPopUp && <div className='popup'>Added to Cart</div>}
        <ShoppingCartIcon/>
      </div>
    </header>
  );
};

export default Header;
