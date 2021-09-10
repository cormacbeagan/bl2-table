import express, { Response, Request } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { scraper } from "./functions/scraper";

const app = express();
const PORT = process.env.PORT || 8888;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(__dirname));

app.get("/", async (req: Request, res: Response) => {
  try {
    const htmlString = await scraper();
    res.status(200).header("Content-Type", "text/html").send(htmlString);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

app.get("/style.css", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/" + "style.css");
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});

export {};
