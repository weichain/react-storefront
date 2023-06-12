import Image from "next/image";
import React from "react";
import { Collapse } from "react-collapse";

import { IBlock } from "./RichText";

interface IBlockProps {
  block: IBlock;
  openAccordion: (id: string) => void;
}

const Block = ({ block, openAccordion }: IBlockProps) => {
  return (
    <div>
      <hr />
      <div>
        <div className="flex items-center justify-between">
          <p>{block.content}</p>
          <p onClick={() => openAccordion(block.content)} className="cursor-pointer">
            {block.display ? "-" : "+"}
          </p>
        </div>
        <Collapse isOpened={block.display}>
          {block.display && (
            <>
              <ul
                className={`${
                  block.content === "How to use" ? "list-none pl-0" : "list-disc pl-6"
                } text-[#4C4C4C]`}
              >
                {block.items?.map((item) => (
                  <li key={item.content}>{item.content}</li>
                ))}
              </ul>
              <Image
                src="/learnmore.svg"
                alt="back"
                width={110}
                height={50}
                className={`${
                  block.content === "How to use" ? "block" : "hidden"
                } cursor-pointer pl-2`}
              />
            </>
          )}
        </Collapse>
      </div>
    </div>
  );
};

export default Block;
