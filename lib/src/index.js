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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const inquirer_1 = __importDefault(require("inquirer"));
const package_json_1 = __importDefault(require("../package.json"));
const init_1 = require("./init");
const exports_1 = require("./exports");
const checkUndefinedMessages_1 = require("./checkUndefinedMessages");
const checkChineseText_1 = require("./checkChineseText");
const view_1 = require("./view");
commander_1.default
    .version(package_json_1.default.version, "-v, --version")
    .name("ftintl")
    .usage("国际化工具");
commander_1.default
    .command("init")
    .option("-y", "使用默认配置")
    .description("初始化项目")
    .action((args) => __awaiter(void 0, void 0, void 0, function* () {
    if (args.y) {
        init_1.initCLI();
        init_1.initLangs();
        return;
    }
    const res = yield inquirer_1.default.prompt({
        type: "confirm",
        name: "confirm",
        default: false,
        message: "是否初始化CLI相关配置？",
    });
    if (res.confirm) {
        init_1.initCLI();
    }
}));
/**
 * 导出资源文件中未翻译的文案
 */
commander_1.default
    .command("untranslated")
    .option("--output-path <outputPath>", "输出目录")
    .option("--lang <lang>", "要检查的语言")
    .description("导出资源文件中未翻译的文案")
    .action((options) => {
    view_1.spining("导出资源文件中未翻译的文案", () => {
        exports_1.exportUntranslatedMessages(options.outputPath, options.lang);
    });
});
/**
 * 校验资源文件中未使用文案
 */
commander_1.default
    .command("unused")
    .requiredOption("--file <filePath>", "必须指定扫描的文件或文件夹")
    .option("--lang <lang>", "要检查的语言")
    .description("校验资源文件中未使用文案")
    .action((options) => {
    view_1.spining("校验资源文件中未使用文案", () => {
        exports_1.exportUnusedMessages(options.file, options.lang);
    });
});
/**
 * 校验已使用但未在资源文件定义的文案
 */
commander_1.default
    .command("undefined")
    .requiredOption("--file <filePath>", "必须指定扫描的文件或文件夹")
    .option("--lang <lang>", "要检查的语言")
    .description("校验已使用但未在资源文件定义的文案")
    .action((options) => {
    view_1.spining("校验已使用但未在资源文件定义的文案", () => {
        checkUndefinedMessages_1.checkUndefinedMessages(options.file, options.lang);
    });
});
/**
 * 检查文件中的中文文案
 */
commander_1.default
    .command("zh [mode]")
    .requiredOption("--file <filePath>", "必须指定扫描的文件或文件夹")
    .option("--output-path <outputPath>", "输出目录")
    .description("检查文件中的中文文案")
    .action((mode = "terminal", options) => {
    view_1.spining("检查文件中的中文文案", () => {
        checkChineseText_1.checkChineseText(mode, {
            filePath: options.file,
            outputPath: options.outputPath,
        });
    });
});
commander_1.default.parseAsync(process.argv);
