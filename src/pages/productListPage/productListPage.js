

import React, { useState, useEffect } from 'react';
import ProductListComponent from '../../components/ProductListComponent/ProductListComponent.js';
import SortDropdown from '../../components/ProductListComponent/sortDropDown.js';
import SearchField from '../../components/ProductListComponent/search.js';
import {Routes, Route,useNavigate} from 'react-router-dom';
import './productLstPage.css';
function ProductListingPage() {

  // const history = useNavigate();

  const [productListData, setProductListData] = useState([]);
  const [selectedValue, setselectedValue] = useState('All');

  async function getProductsApiForFilter() {
    let url = "https://servicereminder.el.r.appspot.com/supertailsProductsAssignment";
    const response = await fetch(url);
    let productList = await response.json();
    return (productList?.products ?? []);
  };

  async function getProductsApi() {
    let url = "https://servicereminder.el.r.appspot.com/supertailsProductsAssignment";
    const response = await fetch(url);
    let productList = await response.json();
    setProductListData(productList?.products ?? []);
  };
  useEffect(() => {
    getProductsApi();
  }, []);


  async function onSortChange(e, data) {
    if (!data) {
      if (e == "priceHighToLow") {
        let sortedProducts = [...productListData];
        sortedProducts.sort(function (a, b) { return b.variants[0]?.price - a.variants[0]?.price });
        setProductListData(sortedProducts);

      }
      else if (e == "priceLowToHigh") {
        let sortedProducts = [...productListData];
        sortedProducts.sort(function (a, b) { return a.variants[0]?.price - b.variants[0]?.price });
        setProductListData(sortedProducts);

      }
      else if (e == "nameAsc") {
        let sortedProducts = [...productListData];
        sortedProducts.sort((a, b) => {
          const titlea = a.title.toUpperCase();
          const titleb = b.title.toUpperCase();
          if (titleb > titlea) {
            return -1
          }
          else {
            return 1
          }
        });
        setProductListData(sortedProducts);
      }
      else if (e == "nameDesc") {
        let sortedProducts = [...productListData];
        sortedProducts.sort((a, b) => {
          const titlea = a.title.toUpperCase();
          const titleb = b.title.toUpperCase();
          if (titleb < titlea) {
            return -1
          }
          else {
            return 1
          }
        });
        setProductListData(sortedProducts);
      }
      else if (e == "Services") {
        let pd = await getProductsApiForFilter();
        let sortedProducts = [...pd];
        sortedProducts = sortedProducts.filter((product) =>
          product.tags.includes("Services")
        );
        setProductListData(sortedProducts);
      }
      else if (e == "Dog Food") {
        let pd = await getProductsApiForFilter();
        let sortedProducts = [...pd];
        sortedProducts = sortedProducts.filter((product) =>
          product.tags.includes("dog food")
        );
        setProductListData(sortedProducts);
      }
      else if (e == "Cats") {
        let pd = await getProductsApiForFilter();
        let sortedProducts = [...pd];
        sortedProducts = sortedProducts.filter((product) =>
          product.tags.includes("Cats")
        );
        setProductListData(sortedProducts);
      }
      else if (e == "Henlo") {
        let pd = await getProductsApiForFilter();
        let sortedProducts = [...pd];
        sortedProducts = sortedProducts.filter((product) =>
          product.tags.includes("Henlo")
        );
        setProductListData(sortedProducts);
      }
      else if (e == "All") {
        await getProductsApi();
      }    // setProductListData(sortedProducts);
      console.log(e);
    }
    else {
      console.log("in");
      let pd = await getProductsApiForFilter();
      let sortedProducts = [...pd];
      sortedProducts = sortedProducts.filter((product) =>
        product.title.toLowerCase().includes(data.toLowerCase())
      );
      console.log(sortedProducts.length);
      setProductListData(sortedProducts);
    }
  }

  // const dropdownStyle = {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems:"center"
  // };
  const button = {
    padding: '10px',
    margin:"10px",
    borderRadius:"6px"
  }
  let buttonsArray = ["Services","All","Dog Food","Cats","Henlo"]

  const GoToPage = (pId) => {
    // Navigate to the desired page
    // history.push('/pdp/:id');
    window.location.href = `/pdp?pid=${pId}`;
  };

  return (
    // <Routes>
    //{/* <Route exact path="/" component={ProductListingPage} /> */}

    <div>
      <SearchField products={productListData} handleSearchChange={onSortChange} />
      <div
        className="dropdownStyle">
          {buttonsArray.map((product, index) => (
        <div key={index}
        style={{...button,backgroundColor:selectedValue == product ?"blue" : "#e98585"}}
        onClick={() => {
          setselectedValue(product);
          onSortChange(product)
        }}>
        {product}
        </div>
      ))}
        <SortDropdown onSortChange={onSortChange} />

      </div>
      {productListData.map((product, index) => (
        <ProductListComponent key={index}
        pid={product?.id ?? ""}
          GoToPage={GoToPage}
          img={product?.image ? product?.image?.src : productListData[index + 1]?.image?.src ?? ""}
          title={product?.title ?? ""}
          varianceTitle={product?.variants[0]?.title ?? ""}
          price={product?.variants[0]?.price}
          comparePrice={product?.variants[0]?.compare_at_price ?? ""}
        />
      ))}

    </div>
        
// </Routes>
  );
}

export default ProductListingPage;
