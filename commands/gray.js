// Import necessary modules from "commander", "sharp", "path", and custom utilities
import { Command } from "commander";
import sharp from "sharp";
import { resolve, dirname } from "path";
import { generateUniqueFilename } from "../utils/generateFileName.js";
import {
  logError,
  logFilePath,
  logSuccess,
} from "../utils/colorFormatOutput.js";

// Create a new Command instance for the "gray" command
const grayscaleCommand = new Command();

grayscaleCommand
  .name("gray")
  .arguments("<inputFile>") // Expect an input file as an argument
  .description("Convert an image to grayscale (black and white)") // Describe what this command does
  .action(async (inputFile) => {
    try {
      // Generate a unique filename for the output file
      const outputFileName = generateUniqueFilename(inputFile, "grayscale");
      const outputPath = resolve(dirname(inputFile), outputFileName);

      // Convert the input file to grayscale
      await sharp(inputFile).grayscale().toFile(outputFileName);

      // Log success message and output file path
      logSuccess("Image successfully converted to grayscale.");
      logFilePath(`File saved at: ${outputPath}`);
    } catch (error) {
      // Log any errors that occur during the process
      logError(error.message);
    }
  })

  // Provide additional help information for the "gray" command
  .on("--help", () => {
    logSuccess("\nUsage:");
    logSuccess("  pix-transmute gray <inputFile>");
    logSuccess("\nExamples:");
    logSuccess("  $ pix-transmute gray input.jpg");
  });

export default grayscaleCommand; // Export the grayscaleCommand for use in other modules
