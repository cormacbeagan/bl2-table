import { scraper } from "../../functions/scraper.js";
export default function handler(req, res) {
  try {
    const htmlString = await scraper();
    res.status(200).header("Content-Type", "text/html").send(htmlString);
  } catch (err) {
    res.status(400).send();
  }
}
