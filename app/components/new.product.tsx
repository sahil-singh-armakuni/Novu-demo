"use client";

import { FC, useState, useCallback } from "react";

const NewProduct: FC<{ addProduct: (name: string) => void }> = (props: {
  addProduct: (name: string) => void;
}) => {
  const { addProduct } = props;
  const [name, setName] = useState("");
  const addProductFunc = useCallback(() => {
    setName("");
    addProduct(name);
  }, [addProduct, name]);
  return (
    <div className="flex mb-5">
      <input
        value={name}
        placeholder="Product Name"
        name="name"
        className="w-[25.5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="button"
        onClick={addProductFunc}
        className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        New Product
      </button>
    </div>
  );
};

export default NewProduct;
