import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { scraper } from "./functions/scraper.js";
import { fixtures } from "./functions/scrapeFixtures.js";
import { allFixtures } from "./functions/scrapeAllFixtures.js";
import path from "path";

const zweite = "RLbayern";
const erste = "BL2S";
const damen = "D7Fs";

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 8888;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", async (req, res) => {
  try {
    const htmlString = await scraper(erste);
    res.setHeader(
      "Content-Security-Policy",
      "frame-ancestors https://www.stusta-rugby.de http://127.0.0.1:5501"
    );
    res.status(200).header("Content-Type", "text/html").send(htmlString);
  } catch (err) {
    console.error(err);
    res.status(400).send();
  }
});

app.get("/regio", async (req, res) => {
  try {
    const htmlString = await scraper(zweite);
    res.setHeader(
      "Content-Security-Policy",
      "frame-ancestors https://www.stusta-rugby.de http://127.0.0.1:5501"
    );
    res.status(200).header("Content-Type", "text/html").send(htmlString);
  } catch (err) {
    console.error(err);
    res.status(400).send();
  }
});

app.get("/damen", async (req, res) => {
  try {
    const htmlString = await scraper(damen);
    res.setHeader(
      "Content-Security-Policy",
      "frame-ancestors https://www.stusta-rugby.de http://127.0.0.1:5501"
    );
    res.status(200).header("Content-Type", "text/html").send(htmlString);
  } catch (err) {
    console.error(err);
    res.status(400).send();
  }
});

app.get("/all-fixtures", async (req, res) => {
  try {
    const fixString = await allFixtures();
    res.setHeader(
      "Content-Security-Policy",
      "frame-ancestors https://www.stusta-rugby.de http://127.0.0.1:5501"
    );
    res.status(200).header("Content-Type", "text/html").send(fixString);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

app.get("/fixtures", async (req, res) => {
  try {
    const fixString = await fixtures(erste);
    res.setHeader(
      "Content-Security-Policy",
      "frame-ancestors https://www.stusta-rugby.de http://127.0.0.1:5501"
    );
    res.status(200).header("Content-Type", "text/html").send(fixString);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

app.get("/fixtures-regio", async (req, res) => {
  try {
    const fixString = await fixtures(zweite);
    res.setHeader(
      "Content-Security-Policy",
      "frame-ancestors https://www.stusta-rugby.de http://127.0.0.1:5501"
    );
    res.status(200).header("Content-Type", "text/html").send(fixString);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.get("/fixtures-damen", async (req, res) => {
  try {
    const fixString = await fixtures(damen);
    res.setHeader(
      "Content-Security-Policy",
      "frame-ancestors https://www.stusta-rugby.de http://127.0.0.1:5501"
    );
    res.status(200).header("Content-Type", "text/html").send(fixString);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});
