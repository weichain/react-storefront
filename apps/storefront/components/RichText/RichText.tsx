/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

import { parseEditorJSData } from "@/lib/util";

import Block from "./ Block";
import { dummyData } from "./data";
//import Blocks from "editorjs-blocks-react-renderer";

export interface RichTextProps {
  jsonStringData?: string;
}

export function RichText({ jsonStringData }: RichTextProps) {
  const [dummyBlocks, setDummyBlocks] = useState(dummyData.blocks);

  const data = parseEditorJSData(jsonStringData);
  if (!data) {
    return null;
  }

  const openAccordion = (id: string) => {
    const findIndex = dummyBlocks.findIndex((block) => block.id === id) + 1;

    setDummyBlocks(() =>
      dummyBlocks.map((block, index) =>
        block.id === id
          ? { ...block, display: !block.display }
          : block && findIndex === index
          ? { ...block, display: !block.display }
          : block
      )
    );
  };

  return (
    <article className="prose-2xl">
      {/* <Blocks data={data} /> */}
      {dummyBlocks.map((block, index) => (
        <Block key={block.id} block={block} index={index} openAccordion={openAccordion} />
      ))}
    </article>
  );
}

export default RichText;
