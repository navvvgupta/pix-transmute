# pix-transmute

[![npm version](https://img.shields.io/npm/v/pic-morph.svg)](https://www.npmjs.com/package/pic-morph)

An npm package to manipulate images using the command line interface.

## Installation

To install pix-transmute globally, use the following command:

npm install -g pix-transmute

## Features

pix-transmute offers powerful and robust image transformation features right from your terminal:

- Compression: Reduce image file size while maintaining quality.
- Conversion: Convert images between different formats.
- Background Removal: Remove the background from images using remove.bg API.
- Grayscale Conversion: Convert images to grayscale.
- Image Information: Retrieve detailed information about an image.

## Commands

### Image Compression

Compress an image with optional quality adjustment.

pix-transmute compress <input_file> [-q <quality>]

- Example:
  pix-transmute compress myimage.jpg
  pix-transmute compress myimage.jpg -q 80

### Image Conversion

Convert an image from one format to another.

pix-transmute convert <input_file.extension> <output_file.extension>

- Example:
  pix-transmute convert myimage.jpg myimage.png

### Remove Background

Remove the background from an image.

pix-transmute remove-bg <input_file>

- Example:
  pix-transmute remove-bg myimage.jpg

### Convert to Grayscale

Convert an image to grayscale.

pix-transmute gray <input_file>

- Example:
  pix-transmute gray myimage.jpg

### Get Image Information

Retrieve detailed information about an image.

pix-transmute info <input_file>

- Example:
  pix-transmute info myimage.jpg

## Contact

If you have any questions or suggestions, feel free to reach out to me on Linkedin.
