import React from 'react';
import ProductCard from './ProductCard';
import image from "../assets/images/Subtract.png";


// Remove the existing Product component
// ...

const ProductList = () => {
    const products = [
      { name: 'White Rice', price: 40.00, description: 'Best rice offer in the market lorem ipsum lorem ipsum..' },
      { name: 'Brown Rice', price: 35.00, description: 'Nutrient-rich brown rice for a healthier lifestyle. Packed with essential fibers.' },
      { name: 'Basmati Rice', price: 50.00, description: 'Exquisite basmati rice known for its aromatic fragrance and long grains.' },
      { name: 'Jasmine Rice', price: 45.00, description: 'Fragrant jasmine rice with a delicate aroma, perfect for special occasions.' },
      { name: 'Arborio Rice', price: 55.00, description: 'High-quality arborio rice, essential for making creamy and delicious risotto.' },
      { name: 'Wild Rice', price: 60.00, description: 'Nutty and flavorful wild rice, a unique addition to your culinary repertoire.' },
      { name: 'Quinoa', price: 48.00, description: 'Organic quinoa, a versatile superfood that adds a nutritional boost to your meals.' },
      { name: 'Sushi Rice', price: 42.00, description: 'Specially crafted sushi rice for creating authentic and delicious sushi dishes.' },
      { name: 'Forbidden Black Rice', price: 65.00, description: 'Forbidden black rice, rich in antioxidants and visually striking on the plate.' },
      { name: 'Red Cargo Rice', price: 38.00, description: 'Red cargo rice, a nutritious and colorful alternative for your meals.' },
      // Repeat the above products to reach a total of 20
      { name: 'Sweet Rice', price: 46.00, description: 'Sweet rice, perfect for desserts and sweet dishes.' },
      { name: 'Carnaroli Rice', price: 58.00, description: 'Carnaroli rice, the king of risotto rice for a creamy and flavorful dish.' },
      { name: 'Black Quinoa', price: 52.00, description: 'Black quinoa, a visually striking and nutritious addition to your meals.' },
      { name: 'Basmati Brown Rice', price: 43.00, description: 'Healthy basmati brown rice with a delightful nutty flavor.' },
      { name: 'Calrose Rice', price: 34.00, description: 'Calrose rice, a medium-grain rice perfect for various culinary applications.' },
      { name: 'Medium-Grain White Rice', price: 36.00, description: 'Medium-grain white rice, versatile for a wide range of dishes.' },
      { name: 'Barley', price: 30.00, description: 'Barley, a hearty grain with a chewy texture, great for soups and salads.' },
      { name: 'Long-Grain Parboiled Rice', price: 32.00, description: 'Long-grain parboiled rice, fluffy and separate grains for your meals.' },
      { name: 'Brown Basmati Rice', price: 47.00, description: 'Brown basmati rice, a healthier alternative with a distinctive aroma.' },
      { name: 'Short-Grain Arborio Rice', price: 56.00, description: 'Short-grain arborio rice, essential for creamy and flavorful risottos.' },
    
      // Add more products as needed
    ];

    const rows = [];
    const cardsPerRow = 4;
    const cardSpacing = 4; // Adjust this value for the desired spacing between cards
    const rowSpacing = 8; // Adjust this value for the desired spacing between rows
    
    for (let i = 0; i < products.length; i += cardsPerRow) {
      const rowProducts = products.slice(i, i + cardsPerRow);
    
      const row = (
        <div key={i} className="flex space-x-4">
          {rowProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      );
    
      rows.push(row);
    }
  
    return (
        <div className="product-list" style={{ marginTop: -rowSpacing }}>
        {rows.map((row, index) => (
          <div key={`row-${index}`} style={{ marginBottom: rowSpacing }}>
            {row}
          </div>
        ))}
      </div>
    );
    
  };
  
  const ProductPage = () => (
    <div className=" font-['Raleway'] bg-[#ffffff] w-full">
      <div className="flex items-start justify-between h-[70px] shadow-lg px-[25px] ">
        <div className=" py-[15px] flex items-center justify-center   ">
          <a className="cursor-pointer " href="/">
            <h1 className="text-[21px] font-extrabold text-[#565454] max-sm:text-3xl max-md:text-4xl">
              WE
              <img
                className="inline-block w-[40px] md:w-[60px] mb-[4px] ml-[2px] "
                src={image}
                alt=""
              ></img>
            </h1>
          </a>
        </div>
      </div>

      

      <div className="text-center my-6">
      <h2 className="text-2xl font-bold text-[#007A3D]">Check Out Our Products</h2>
    </div>

      <ProductList />
    </div>
  );
  
  export default ProductPage;
  