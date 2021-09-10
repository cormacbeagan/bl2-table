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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const scraper_1 = require("./functions/scraper");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8888;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.static(__dirname));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const htmlString = yield (0, scraper_1.scraper)();
        res.status(200).header("Content-Type", "text/html").send(htmlString);
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
}));
app.get("/style.css", (req, res) => {
    res.sendFile(__dirname + "/" + "style.css");
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server listening on port ${PORT}`);
}));
