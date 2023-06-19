/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { parseEditorJSData } from "@/lib/util";
import Block from "./ Block";
//import Blocks from "editorjs-blocks-react-renderer";

export interface RichTextProps {
  jsonStringData?: string;
}

export interface IBlock {
  content: string;
  display: boolean;
  items: { items: []; content: string }[];
}

export function RichText({ jsonStringData }: RichTextProps) {
  const [blocks, setBlocks] = useState<IBlock[]>(
    parseEditorJSData(jsonStringData)?.blocks[0].data.items as IBlock[]
  );

  useEffect(() => {
    blocks ? setBlocks(() => blocks.map((block: IBlock) => ({ ...block, display: false }))) : null;
  }, []);

  const data = parseEditorJSData(jsonStringData);
  if (!data || !blocks) {
    return null;
  }

  const openAccordion = (content: string) => {
    setBlocks(() =>
      blocks.map((block: IBlock) =>
        block.content === content ? { ...block, display: !block.display } : block
      )
    );
  };

  return (
    <article className="prose-2xl">
      {/* <Blocks data={data} /> */}
      {blocks.map((block: IBlock) => (
        <Block key={block.content} block={block} openAccordion={openAccordion} />
      ))}
    </article>
  );
}

export default RichText;
