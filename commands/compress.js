import { Command } from "commander";
import sharp from "sharp";
import { resolve, dirname } from "path";
import { generateUniqueFilename } from "../utils/generateFileName.js";
import {
  logError,
  logFilePath,
  logSuccess,
} from "../utils/colorFormatOutput.js";

// Create a new Command instance for the "compress" command
const compressCommand = new Command();

compressCommand
  .name("compress")
  .arguments("<inputFile>") // Expect an input file as argument
  .option(
    "-q, --quality <value>",
    "Set the quality of the compressed image between 1-100 (default is 60)"
  )
  .description("Compress an image") // Describe what this command does
  .action(async (inputFile, option) => {
    try {
      // Generate a unique filename for the output file
      const outputFileName = generateUniqueFilename(inputFile, "compressed");
      console.log("Output Filename:", outputFileName);
      const outputPath = resolve(dirname(inputFile), outputFileName);

      // Validate the quality option provided by the user
      const qualityOption = parseInt(option.quality, 10);
      if (!isNaN(qualityOption) && (qualityOption > 100 || qualityOption < 1)) {
        throw new Error(
          "Invalid value for the quality option. Quality should be between 1 and 100."
        );
      }

      // Use the provided quality or default to 60 if not specified
      const quality = qualityOption || 60;

      // Perform the image compression using sharp
      const info = await sharp(inputFile)
        .jpeg({ quality: quality })
        .toFile(outputFileName);

      // Log success messages with details
      logSuccess(`Image compressed to ${quality}% quality.`);
      logFilePath(`File saved at: ${outputPath}`);
    } catch (err) {
      // Log any errors that occur during the process
      logError(err.message);
    }
  })
  // Provide additional help information for the "compress" command
  .on("--help", () => {
    logSuccess("\nUsage:");
    logSuccess("  pix-transmute compress <inputFile> [-q <quality>]");
    logSuccess("\nExamples:");
    logSuccess("  $ pix-transmute compress input.jpg");
    logSuccess("  $ pix-transmute compress input.jpg -q 80");
    logSuccess("\nNote:");
    logSuccess("  The value of -q should be between 1 and 100.");
  });

export default compressCommand; // Export the compressCommand for use in other modules
