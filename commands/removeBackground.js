// Import necessary modules from "commander", "fs", "path", "axios", "form-data", and custom utilities
import { Command } from "commander";
import fs from "fs";
import { resolve, dirname } from "path";
import axios from "axios";
import FormData from "form-data";
import { generateUniqueFilename } from "../utils/generateFileName.js";
import {
  logError,
  logFilePath,
  logSuccess,
} from "../utils/colorFormatOutput.js";
import dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

// API key for the remove.bg service
const API_KEY = process.env.REMOVE_BG_API_KEY || "GcKxuCeaSzshPVSepnDKWrxi";

// Create a new Command instance for the "remove-bg" command
const removeBackgroundCommand = new Command();

removeBackgroundCommand
  .name("remove-bg")
  .arguments("<inputFile>") // Expect an input file as an argument
  .description("Remove the background from an image") // Describe what this command does
  .action(async (inputFile) => {
    try {
      // Generate a unique filename for the output file
      const outputFileName = generateUniqueFilename(inputFile, "no-bg");
      const outputPath = resolve(dirname(inputFile), outputFileName);

      // Prepare the form data to send to the remove.bg API
      const formData = new FormData();
      formData.append("image_file", fs.createReadStream(inputFile));
      formData.append("size", "auto");

      // Send a request to the remove.bg API
      const response = await axios({
        method: "post",
        url: "https://api.remove.bg/v1.0/removebg",
        data: formData,
        headers: {
          ...formData.getHeaders(),
          "X-Api-Key": API_KEY,
        },
        responseType: "arraybuffer",
      });

      // Check if the response status is not 200 (OK)
      if (response.status !== 200) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Write the response data to the output file
      fs.writeFileSync(outputPath, response.data);

      // Log success message and output file path
      logSuccess("Background removed successfully.");
      logFilePath(`File saved at: ${outputPath}`);
    } catch (error) {
      // Log any errors that occur during the process
      logError(error.message);
    }
  })

  // Provide additional help information for the "remove-bg" command
  .on("--help", () => {
    logSuccess("\nUsage:");
    logSuccess("  pix-transmute remove-bg <inputFile>");
    logSuccess("\nExamples:");
    logSuccess("  $ pix-transmute remove-bg input.jpg");
  });

export default removeBackgroundCommand; // Export the removeBackgroundCommand for use in other modules
