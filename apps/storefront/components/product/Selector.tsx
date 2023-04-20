import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Selector = () => {
  const [selected, setSelected] = useState(numbers[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="w-12 h-11 font-medium border border-lightgray">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 text-[16px] flex items-center justify-between rounded ${
          !selected && "text-gray-700"
        }`}
      >
        {selected}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white overflow-y-auto ${
          open ? "max-h-60 border border-lightgray" : "max-h-0"
        } `}
      >
        {numbers?.map((number) => (
          <li
            key={number}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white`}
            onClick={() => {
              setSelected(number);
              setOpen(false);
            }}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
