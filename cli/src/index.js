#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var prompts_1 = require("prompts");
var componentDir = path_1["default"].join(__dirname, '..', '..', 'components', 'ui');
var targetDir = process.cwd();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var components, _i, components_1, component, sourcePath, targetPath, utilsSourcePath, utilsTargetPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, prompts_1["default"])({
                        type: 'multiselect',
                        name: 'components',
                        message: 'Select components to add',
                        choices: fs_extra_1["default"].readdirSync(componentDir).map(function (file) { return ({ title: path_1["default"].parse(file).name, value: file }); })
                    })];
                case 1:
                    components = (_a.sent()).components;
                    if (!components || components.length === 0) {
                        console.log('No components selected. Exiting...');
                        return [2 /*return*/];
                    }
                    _i = 0, components_1 = components;
                    _a.label = 2;
                case 2:
                    if (!(_i < components_1.length)) return [3 /*break*/, 5];
                    component = components_1[_i];
                    sourcePath = path_1["default"].join(componentDir, component);
                    targetPath = path_1["default"].join(targetDir, 'components', 'ui', component);
                    return [4 /*yield*/, fs_extra_1["default"].copy(sourcePath, targetPath)];
                case 3:
                    _a.sent();
                    console.log("Added ".concat(component, " to your project!"));
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    utilsSourcePath = path_1["default"].join(__dirname, '..', '..', 'lib', 'utils.ts');
                    utilsTargetPath = path_1["default"].join(targetDir, 'lib', 'utils.ts');
                    if (!!fs_extra_1["default"].existsSync(utilsTargetPath)) return [3 /*break*/, 7];
                    return [4 /*yield*/, fs_extra_1["default"].copy(utilsSourcePath, utilsTargetPath)];
                case 6:
                    _a.sent();
                    console.log('Added utils.ts to your project!');
                    _a.label = 7;
                case 7:
                    console.log('All selected components have been added to your project!');
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](console.error);
