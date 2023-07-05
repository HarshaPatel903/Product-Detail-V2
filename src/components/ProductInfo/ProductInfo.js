import React, { useState, useEffect } from 'react';
import './ProductInfo.css';
import QuantityPicker from './subComponents/quantityPicker/QuantityPicker.js';
import ModalDialog from './subComponents/popUp.js'
import I1 from '../../assets/i1.png'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'


const ProductInfo = ({ addToCart }) => {

  const handleQuantityChange = (value) => {
    console.log('Quantity changed:', value);
  };
  const [productData, setProductData] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [showPopup, setshowPopup] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [popUpData, setData] = useState('');
  setTimeout(() => {
    setshowPopup(false);
  }, 2000);
  const handleUpload = (e) => {
    const file = e?.target?.files[0];
    setData(file?.name);
    setUploaded(!uploaded);
    setshowPopup(true);
    setTimeout(() => {
      setshowPopup(false);
    }, 2000);
  };

  const [sizes, setSize] = useState([]);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('0');
  const [selectedCPrice, setSelectedCPrice] = useState('99');
  const [isService, setisService] = useState(false);
  let sizesData = [];
  let priceData = [];
  let cPriceData = [];
  async function initttt() {
    setisLoading(true);
    const queryString = window.location.search.substring(1);

    console.log(queryString?.split('=')[1] ? queryString?.split('=')[1] : "");
    let url = `https://crud-api-v2.onrender.com/productData?pid=${queryString?.split('=')[1] ? queryString?.split('=')[1] : ""}`;
    const response = await fetch(url);
    let prod = await response.json();

    setProductData(prod);
    sizesData = [];
    priceData = [];
    cPriceData = [];
    for (let i = 0; i < prod.variants.length; i++) {
      sizesData.push(prod.variants[i].title);
      priceData.push(prod.variants[i].price);
      cPriceData.push(prod.variants[i].compare_at_price);
    }
    setSelectedSize(sizesData[0] ?? "")
    setSize(sizesData);
    setSelectedPrice(priceData);
    setSelectedCPrice(cPriceData);
    setisService(prod.tags.includes("Services"))
    setisLoading(false);
  }

  useEffect(() => {
    initttt()
  }, []);

  return (
    <div className="main_div">
      {
        showPopup && <ModalDialog popUpData={popUpData} />
      }
      <div className="product_title">
        {productData.title}
      </div>
      <div className="product_size">
        Size
      </div>
      <div className='rowcss'>
        {sizes.map((size, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedSize(size)
              var selectedVariant = null;

              for (var i = 0; i < productData.variants.length; i++) {
                if (productData.variants[i].title === size) {
                  selectedVariant = productData.variants[i];
                  break;
                }
              }

              if (selectedVariant) {
                setSelectedPrice(parseInt(selectedVariant.price))
                setSelectedCPrice(parseInt(selectedVariant.compare_at_price))
              } else {
                console.log("Variant not found");
              }
            }} className="product_size_box" style={{ border: selectedSize === size ? '3px solid green' : '1px solid black' }}>
            {size}
          </div>
        ))}
      </div>
      <div className="product_size">
        Quantity
      </div>
      <QuantityPicker min={1} max={10} initialValue={1} onQuantityChange={handleQuantityChange} />
      <div className="rowcssPI">
        <div className="product_price">
          ₹{parseInt(selectedPrice)}
        </div>
        <div className="product_mrp_price">
          MRP ₹{parseInt(selectedCPrice)}
        </div>
      </div>
      {!uploaded && isService ?
        <div className='upload-btn-main'>
          <input
            className='upload-btn'
            type="file"
            accept=".png,.jpeg,.pdf"
            onChange={handleUpload}
          />
          <div className='upload-prec'
          >
            UPLOAD PRESCRIPTION

          </div>
        </div>
        :
        <div
          onClick={addToCart}
          className='upload-prec' style={{ paddingLeft: '80px', paddingRight: '80px' }}>
          ADD TO CART
        </div>}
      <img className='product-icon-wraper' src={I1} />
    </div>
  );
};

export default ProductInfo;


