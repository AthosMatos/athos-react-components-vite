const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "..", "src");
const exportDir = path.join(__dirname, "..", "export");

// Folders to process
const moduleFolders = ["Module", "LightModule"];

// Folders/files to exclude
const excludeItems = ["page", "pages", "old"];

// Regex patterns to fix imports
const importPatterns = [
  // Fix imports like: from "../../ComponentName/component" or from "../ComponentName/component"
  {
    regex: /from\s+["']\.\.\/(?:\.\.\/)*([^"'\/]+)\/component["']/g,
    replacement: 'from "../$1"',
  },
  // Fix imports like: from "../../ComponentName/component/something" or from "../ComponentName/component/something"
  {
    regex: /from\s+["']\.\.\/(?:\.\.\/)*([^"'\/]+)\/component\/([^"']+)["']/g,
    replacement: 'from "../$1/$2"',
  },
  // Fix imports like: from "../../hooks/something" or from "../hooks/something" (shared folders)
  {
    regex: /from\s+["']\.\.\/(?:\.\.\/)*hooks\/([^"']+)["']/g,
    replacement: 'from "../hooks/$1"',
  },
  // Fix imports like: from "../../utils/something" or from "../utils/something"
  {
    regex: /from\s+["']\.\.\/(?:\.\.\/)*utils\/([^"']+)["']/g,
    replacement: 'from "../utils/$1"',
  },
  // Fix imports like: from "../../colors/something" or from "../colors/something"
  {
    regex: /from\s+["']\.\.\/(?:\.\.\/)*colors\/([^"']+)["']/g,
    replacement: 'from "../colors/$1"',
  },
  // Fix imports like: from "../../interfaces/something" or from "../interfaces/something"
  {
    regex: /from\s+["']\.\.\/(?:\.\.\/)*interfaces\/([^"']+)["']/g,
    replacement: 'from "../interfaces/$1"',
  },
  // Fix imports like: from "../../interfaces" or from "../interfaces" (no subpath)
  {
    regex: /from\s+["']\.\.\/(?:\.\.\/)*interfaces["']/g,
    replacement: 'from "../interfaces"',
  },
  // Fix imports like: from "../types" (LightModule types)
  {
    regex: /from\s+["']\.\.\/types["']/g,
    replacement: 'from "../types"',
  },
  // Fix imports like: from "../../types" (LightModule types from deeper paths)
  {
    regex: /from\s+["']\.\.\/\.\.\/types["']/g,
    replacement: 'from "../types"',
  },
];

function fixImportsInFile(filePath) {
  if (!filePath.endsWith(".ts") && !filePath.endsWith(".tsx")) {
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  for (const pattern of importPatterns) {
    const newContent = content.replace(pattern.regex, pattern.replacement);
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`  Fixed imports in: ${path.relative(exportDir, filePath)}`);
  }
}

function fixImportsRecursive(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      fixImportsRecursive(itemPath);
    } else if (stat.isFile()) {
      fixImportsInFile(itemPath);
    }
  }
}

function copyFolderRecursive(source, target) {
  // Create target folder if it doesn't exist
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const items = fs.readdirSync(source);

  for (const item of items) {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);
    const stat = fs.statSync(sourcePath);

    if (stat.isDirectory()) {
      // Skip excluded folders
      if (excludeItems.includes(item.toLowerCase())) {
        continue;
      }
      copyFolderRecursive(sourcePath, targetPath);
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function flattenComponentFolder(source, target) {
  // If source has a "component" subfolder, copy its contents directly to target
  const componentPath = path.join(source, "component");

  if (fs.existsSync(componentPath) && fs.statSync(componentPath).isDirectory()) {
    // Copy contents of component folder directly to target
    copyFolderRecursive(componentPath, target);
  } else {
    // No component subfolder, copy everything except excluded items
    copyFolderRecursive(source, target);
  }
}

function processModuleFolder(moduleFolder) {
  const modulePath = path.join(srcDir, moduleFolder);

  if (!fs.existsSync(modulePath)) {
    console.log(`Skipping ${moduleFolder} - folder does not exist`);
    return;
  }

  const items = fs.readdirSync(modulePath);

  for (const item of items) {
    const itemPath = path.join(modulePath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      // Skip excluded folders
      if (excludeItems.includes(item.toLowerCase())) {
        continue;
      }

      const targetPath = path.join(exportDir, item);
      console.log(`Processing: ${moduleFolder}/${item} -> export/${item}`);
      flattenComponentFolder(itemPath, targetPath);
    } else if (stat.isFile()) {
      // Copy root-level files (like types.ts)
      const targetPath = path.join(exportDir, item);
      console.log(`Copying file: ${moduleFolder}/${item} -> export/${item}`);
      fs.copyFileSync(itemPath, targetPath);
    }
  }
}

// Main execution
console.log("Generating export folder...\n");

// Clean up existing export folder
if (fs.existsSync(exportDir)) {
  console.log("Removing existing export folder...");
  fs.rmSync(exportDir, { recursive: true, force: true });
}

// Create fresh export folder
fs.mkdirSync(exportDir, { recursive: true });

// Process each module folder
for (const moduleFolder of moduleFolders) {
  console.log(`\nProcessing ${moduleFolder}...`);
  processModuleFolder(moduleFolder);
}

// Fix imports in all exported files
console.log("\nFixing import paths...");
fixImportsRecursive(exportDir);

console.log("\n✅ Export folder generated successfully!");
console.log(`📁 Output: ${exportDir}`);
