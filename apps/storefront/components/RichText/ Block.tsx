/* eslint-disable @next/next/no-img-element */
import React from "react";

interface IBlock {
  block: {
    data: {
      text?: string;
      level?: number;
      items?: string[];
      style?: string;
    };
    id: string;
    type: string;
  };
  index: number;
}

const Block = ({ block, index }: IBlock) => {
  return (
    <div>
      {block.type === "header" ? (
        <>
          <hr />
          <div className="flex justify-between">
            <p className="m-0 font-bold text-[#1E1E1E]">{block.data.text}</p>
            <p className="m-0 text-4xl text-[#1F1F1F] cursor-pointer">+</p>
          </div>
        </>
      ) : (
        <>
          <ul className={`${index === 3 ? "list-none pl-0" : "list-disc pl-6"} text-[#4C4C4C]`}>
            {block.data.items?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <img
            src="/learnmore.svg"
            alt="back"
            className={`${index === 3 ? "block" : "hidden"} cursor-pointer pl-2`}
          />
        </>
      )}
    </div>
  );
};

export default Block;
