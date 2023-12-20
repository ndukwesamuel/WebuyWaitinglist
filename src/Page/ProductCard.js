import React from "react";
import { Button, Card } from "flowbite-react";

const ProductCard = ({ name, price, description }) => {
  return (
    <Card className="w-full max-w-sm bg-white border border-white-200 rounded-3xl border-[1.5px] mt-5 shadow dark:bg-white-800 dark:border-gray-700 ">
      <img
        className="rounded-t-lg"
        src="https://via.placeholder.com/300x200" // Replace with the actual image source
        alt="product image"
      />
      <div className="">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
            {name}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 ">
            {[...Array(4)].map((_, index) => (
              <svg
                key={index}
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <svg
              className="w-4 h-4 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </div>
          <span className="bg-black-100 text-black-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-white-200 dark:text-black-800 ms-3">
            {description}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-black">
            ${price}
          </span>
          <Button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-light green-700 dark:focus:ring-green-800 mt-3 sm:mt-0">
            Add to cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
