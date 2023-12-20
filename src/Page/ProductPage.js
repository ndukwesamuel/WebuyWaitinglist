import React from 'react';
import ProductCard from './ProductCard';
import image from "../assets/images/Subtract.png";
import background from "../assets/images/markus-spiske-ezYZfFnzARM-unsplash.jpg";
import { useGetAllProductQuery } from '../Redux/ProductApi';




// Remove the existing Product component
// ...

const ProductList = () => {
    const { data: products, isLoading, isError, error } = useGetAllProductQuery();



    const rows = [];
    const cardsPerRow = 4;
    const cardSpacing = 20; // Adjust this value for the desired spacing between cards
    const rowSpacing = 12; // Adjust this value for the desired spacing between rows
    if (isLoading) {
        return (<div>loading...</div>);
    }
    for (let i = 0; i < products.length; i += cardsPerRow) {
        const rowProducts = products.slice(i, i + cardsPerRow);

        const row = (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {rowProducts.map((product, index) => (
                    <ProductCard key={index} {...product} />
                ))}
            </div>
        );

        rows.push(row);
    }

    return (

        <div className="w-full pl-20 mt-8 pr-14">
            <div className="product-list flex flex-col w-full h-full p-5  mt-5 bg-white n rounded-xl">

                {rows.map((row, index) => (
                    <div key={`row-${index}`} style={{ marginBottom: rowSpacing }}>
                        {row}
                    </div>
                ))}
            </div>
        </div>

    );


};

const ProductPage = () => (
    <div className=" font-['Raleway'] bg-[#ffffff] w-full ">
        <div className="flex items-center justify-between h-[70px] shadow-lg px-[25px] ">
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
        <>
        <div className="text-center my-6">
        <h2 className="text-3xl font-extrabold text-[#007A3D] max-sm:text-4xl max-md:text-5xl">Discover Our Products</h2>
      </div>
            <form className="w-full bg-gradient-to-r from-[#f7f7f7] via-white to-[#f7f7f7] dark:bg-gradient-to-r from-white via-[#121212] to-[#121212] text-black dark:text-white p-6 rounded-lg shadow-lg">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-base font-semibold text-gray-900 border border-white-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Products"
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-gradient-to-r from-[#007A3D] via-[#006935] to-[#005D27] hover:from-[#005D27] hover:via-[#004E23] hover:to-[#00431F] focus:ring-4 focus:outline-none focus:ring-[#00A859] font-medium rounded-lg text-sm px-6 py-2 dark:bg-gradient-to-r from-[#005D27] via-[#004E23] to-[#00431F] dark:hover:from-[#007A3D] dark:hover:via-[#006935] dark:hover:to-[#005D27] dark:focus:ring-[#00A859]"
          >
            Search
          </button>
        </div>
      </form>
        </>


        <ProductList />
    </div>
);

export default ProductPage;
