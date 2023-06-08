import { extractFileName } from "../shared/utils";

export const getDestinationPath = (
  dimension: number,
  originalName: string,
  outputDir = "./output"
): string => {
  const nameWithoutExtension = extractFileName(originalName);
  return `${outputDir}/${nameWithoutExtension}/${dimension}`;
};
