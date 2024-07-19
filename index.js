#!/usr/bin/env node

// Import the "commander" package
import { Command } from "commander";
const cliTool = new Command();

// Import command modules
import compressCmd from "./commands/compress.js";
import convertCmd from "./commands/convert.js";
import infoCmd from "./commands/get_info.js";
import grayscaleCmd from "./commands/gray.js";
import removeBgCmd from "./commands/removeBackground.js";

async function setupPixTransmute() {
  // Basic details about the npm package
  cliTool
    .name("pix-transmute")
    .description(
      "Ultimate Image CLI: Compress, Convert, Remove Backgrounds, and Apply Grayscale Filters."
    )
    .version("1.0.1");

  // Register the imported command modules with the CLI tool
  cliTool.addCommand(compressCmd);
  cliTool.addCommand(convertCmd);
  cliTool.addCommand(infoCmd);
  cliTool.addCommand(grayscaleCmd);
  cliTool.addCommand(removeBgCmd);

  try {
    // Execute command line arguments by user
    await cliTool.parseAsync(process.argv);
  } catch (error) {
    console.error("Error parsing command-line arguments:", error);
  }
}

export default setupPixTransmute;

setupPixTransmute();
