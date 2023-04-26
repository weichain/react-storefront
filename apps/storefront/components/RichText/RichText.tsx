/* eslint-disable @next/next/no-img-element */
import React from "react";

import { parseEditorJSData } from "@/lib/util";

import { dummyData } from "./data";
import Block from "./ Block";

export interface RichTextProps {
  jsonStringData?: string;
}

export function RichText({ jsonStringData }: RichTextProps) {
  const data = parseEditorJSData(jsonStringData);
  if (!data) {
    return null;
  }

  return (
    <article className="prose-2xl">
      {dummyData.blocks.map((block, index) => (
        <Block key={block.id} block={block} index={index} />
      ))}
    </article>
  );
}

export default RichText;
