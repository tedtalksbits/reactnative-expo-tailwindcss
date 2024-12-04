const fs = require('fs');
const path = require('path');

// Path to your global CSS file
const cssFilePath = path.resolve(__dirname, './global.css');
// Path where the Colors.ts file will be saved
const colorsTsFilePath = path.resolve(__dirname, './constants/Colors.ts');

// Function to extract CSS variables from a CSS file
function extractCssVariables(css) {
  // Regular expression to match CSS variables
  const regex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g; // --variable-name: value;
  let match;
  const variables = {};

  while ((match = regex.exec(css)) !== null) {
    // remove -- from the variable name
    const variableName = match[1].trim();
    const variableValue = match[2].trim();

    variables[variableName] = `hsl(${variableValue})`;
  }

  return variables;
}

// Function to generate Colors.ts from extracted CSS variables
function generateColorsTs(variables) {
  return `export default {
  light: ${JSON.stringify(variables, null, 2)},
  dark: ${JSON.stringify(variables, null, 2)},
};
`;
}

// Check if the constants directory exists, and create it if not
function ensureDirectoryExists(filePath) {
  const directory = path.dirname(filePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Read the CSS file
fs.readFile(cssFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading CSS file:', err);
    return;
  }

  // Extract the CSS variables
  const variables = extractCssVariables(data);

  // Generate the content for Colors.ts
  const colorsTsContent = generateColorsTs(variables);

  // Ensure the constants directory exists and create the file if doesn't
  ensureDirectoryExists(colorsTsFilePath);

  // Write the content to Colors.ts
  fs.writeFile(colorsTsFilePath, colorsTsContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing Colors.ts file:', err);
    } else {
      console.log('Successfully synced CSS variables to Colors.ts!');
    }
  });
});
