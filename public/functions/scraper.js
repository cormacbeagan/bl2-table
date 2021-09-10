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
exports.scraper = void 0;
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = __importDefault(require("jsdom"));
const { JSDOM } = jsdom_1.default;
// global.DOMParser = new JSDOM().window.DOMParser;
global.XMLSerializer = new JSDOM().window.XMLSerializer;
const scraper = () => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        method: "GET",
        url: "http://www.rugbyweb.de/showdb.inc.php?league=BL2S",
    };
    const response = yield (0, axios_1.default)(config);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    const table = document.querySelector(".nodec");
    if (!table)
        throw new Error("Table not found");
    const tableString = new XMLSerializer().serializeToString(table);
    const string = `<!DOCTYPE html>
<html lang="en">
<link rel="stylesheet" type="text/css" href="style.css">
<bod>${tableString}</body>
</html>`;
    return string;
});
exports.scraper = scraper;
