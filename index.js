import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { scraper } from "./functions/scraper.js";

const app = express();
const PORT = process.env.PORT || 8888;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const htmlString = await scraper();
    res.status(200).header("Content-Type", "text/html").send(htmlString);
  } catch (err) {
    res.status(400).send();
  }
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});
