import React from 'react';
import { Button, Card } from 'flowbite-react';

const ProductCard = ({ name, price, description }) => {
  return (
    <Card className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg mb-6">
      <a href="#">
        <img
          className="rounded-t-lg w-full"
          src="https://via.placeholder.com/300x200" // Replace with actual image source
          alt={name}
        />
      </a>
      <div className="p-5">
        <a href="#" className="text-green-800">
          <h5 className="mb-2 text-2xl font-bold tracking-tight">
            {name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-800">
            {`$${price.toFixed(2)}`}
          </span>
        </div>
        <Button
          className=" rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
        >
          ADD TO CART
          <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;

