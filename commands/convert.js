// Import necessary modules from "commander", "sharp", "path", and custom utilities
import { Command } from "commander";
import sharp from "sharp";
import { extname, resolve, dirname } from "path";
import { generateUniqueFilename } from "../utils/generateFileName.js";
import {
  logError,
  logFilePath,
  logSuccess,
} from "../utils/colorFormatOutput.js";

// Create a new Command instance for the "convert" command
const imageConvertCommand = new Command();

imageConvertCommand
  .name("convert")
  .arguments("<inputFile> <outputFile>") // Expect input and output files as arguments
  .description("Convert an image to a different format") // Describe what this command does
  .action(async (inputFile, outputFile) => {
    try {
      // Get the file extensions of the input and output files
      const inputFormat = extname(inputFile);
      const outputFormat = extname(outputFile);

      // Throw an error if the input and output formats are the same
      if (inputFormat === outputFormat) {
        throw new Error(
          `The input and output formats cannot be the same. Both files have the same format: ${inputFormat}`
        );
      }

      // Generate a unique filename for the output file
      const outputFileName = generateUniqueFilename(outputFile);
      const outputPath = resolve(dirname(inputFile), outputFileName);

      // Convert the input file to the specified output format
      await sharp(inputFile).toFile(outputFileName);

      // Log success message and output file path
      logSuccess(
        `Image successfully converted from ${inputFormat} to ${outputFormat}.`
      );
      logFilePath(`File saved at: ${outputPath}`);
    } catch (error) {
      // Log any errors that occur during the process
      logError(error.message);
    }
  })

  // Provide additional help information for the "convert" command
  .on("--help", () => {
    logSuccess("\nUsage:");
    logSuccess("  pix-transmute convert <inputFile> <outputFile>");
    logSuccess("\nExamples:");
    logSuccess("  $ pix-transmute convert input.jpg output.png");
    logSuccess("\nNote:");
    logSuccess("  The input and output files must have different formats.");
  });

export default imageConvertCommand; // Export the imageConvertCommand for use in other modules
