"use client";

import { FC, useCallback, useTransition, useState } from "react";

const BinInput: FC<{
  id: number;
  addBid: (id: number, num: number) => void;
}> = (props: { addBid: (id: number, num: number) => void; id: number }) => {
  const { id, addBid } = props;
  const [input, setInput] = useState("");
  let [isPending, startTransition] = useTransition();

  const updateBid = useCallback(() => {
    startTransition(() => addBid(id, +input));
    setInput("");
  }, [addBid, id, input]);

if(isPending){
  return (
    <div>Loading....</div>
  )
}

  return (
    <div className="flex pt-3">
      <input
        placeholder="Place bid"
        className="flex-1  border-block p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="button"
        className="bg-black text-white p-2  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={updateBid}
      >
        Add Bid
      </button>
    </div>
  );
};

export default BinInput;
