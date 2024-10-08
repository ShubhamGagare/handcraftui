#!/usr/bin/env node

import * as fs from 'fs-extra';
import * as path from 'path';
import prompts from 'prompts';

const componentDir = path.join(__dirname, '..', '..', 'components', 'ui');
const libDir = path.join(__dirname, '..', '..', 'lib');
const targetDir = process.cwd();

async function main() {
  const { components } = await prompts({
    type: 'multiselect',
    name: 'components',
    message: 'Select components to add',
    choices: fs.readdirSync(componentDir).map(file => ({ title: path.parse(file).name, value: file }))
  });

  if (!components || components.length === 0) {
    console.log('No components selected. Exiting...');
    return;
  }

  for (const component of components) {
    const sourcePath = path.join(componentDir, component);
    const targetPath = path.join(targetDir, 'components', 'ui', component);

    await fs.copy(sourcePath, targetPath);
    console.log(`Added ${component} to your project!`);
  }

    // Copy all files from the lib folder
    const libTargetDir = path.join(targetDir, 'lib');

    try {
      await fs.copy(libDir, libTargetDir);
      console.log('Added all files from the lib folder to your project!');
    } catch (error) {
      console.error('Error copying lib folder:', error);
    }

  console.log('All selected components have been added to your project!');
}

main().catch(console.error);