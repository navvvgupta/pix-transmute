import { extname, basename, resolve, dirname } from "path";
import { existsSync } from "fs"; // To check if a file exists

/**
 * Generate a unique filename by appending optional suffixes and counting if necessary.
 * @param {string} inputFile - Original filename.
 * @param {...string} suffixes - Optional suffixes.
 * @returns {string} - Unique filename.
 */
export function generateUniqueFilename(inputFile, ...suffixes) {
  let count = 0;
  let outputFile;
  let outputPath;

  do {
    outputFile = generateFilenameWithCount(inputFile, count, ...suffixes);
    outputPath = resolve(dirname(inputFile), outputFile);
    count++;
  } while (existsSync(outputPath));

  return outputPath;
}

/**
 * Generate filename with optional suffixes and count.
 * @param {string} inputFile - Original filename.
 * @param {number} count - Count to append to the filename.
 * @param {...string} suffixes - Optional suffixes.
 * @returns {string} - Generated filename.
 */
function generateFilenameWithCount(inputFile, count, ...suffixes) {
  const base = basename(inputFile, extname(inputFile));
  const extension = extname(inputFile);
  const countSuffix = count > 0 ? `_${count}` : "";
  const suffixString = suffixes.length ? `_${suffixes.join("_")}` : "";

  return `${base}${suffixString}${countSuffix}${extension}`;
}
