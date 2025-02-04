import { truncate } from "lodash";

export const code = "```";

const NEWLINES = /[\r\n]+/g;

export const compactDescription = (description: string, length?: number) => {
  const oneLine = description.replace(NEWLINES, " ");
  if (!length) {
    return oneLine;
  }
  return truncate(oneLine, {
    length,
  });
};
