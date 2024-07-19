// Import required modules from "commander", "sharp", "path", and custom utilities
import { Command } from "commander";
import sharp from "sharp";
import { extname, resolve } from "path";
import { statSync } from "fs";
import { logError, logSuccess } from "../utils/colorFormatOutput.js";

// Create a new Command instance for the "info" command
const imageInfoCommand = new Command();

// Helper function to format file sizes into human-readable strings
function formatSize(size) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

imageInfoCommand
  .name("info")
  .arguments("<inputFile>") // Expect an input file as an argument
  .description("Retrieve and display information about an image")
  .action(async (inputFile) => {
    try {
      // Get metadata of the inputFile using sharp
      const metadata = await sharp(inputFile).metadata();
      console.log(metadata);
      // Organize the metadata and additional information
      const imageInfo = {
        Format: extname(inputFile).slice(1) || "Unknown",
        Location: resolve(inputFile) || "Unknown",
        Width: metadata.width || "Unknown",
        Height: metadata.height || "Unknown",
        FileSize: formatSize(statSync(inputFile).size) || "Unknown",
      };

      // Log success message and display the image information
      logSuccess("Image information:");
      console.log(imageInfo);
    } catch (error) {
      // Log any errors that occur during the process
      logError(error.message);
    }
  })

  // Provide additional help information for the "info" command
  .on("--help", () => {
    logSuccess("\nUsage:");
    logSuccess("  pix-transmute info <inputFile>");
    logSuccess("\nExamples:");
    logSuccess("  $ pix-transmute info input.jpg");
  });

export default imageInfoCommand; // Export the imageInfoCommand for use in other modules
