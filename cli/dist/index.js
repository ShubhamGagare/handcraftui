#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const componentDir = path.join(__dirname, '..', '..', 'components', 'ui');
const libDir = path.join(__dirname, '..', '..', 'lib');
const targetDir = process.cwd();
async function main() {
    const { components } = await (0, prompts_1.default)({
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
    }
    catch (error) {
        console.error('Error copying lib folder:', error);
    }
    console.log('All selected components have been added to your project!');
}
main().catch(console.error);
