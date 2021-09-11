import axios from "axios";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
global.XMLSerializer = new JSDOM().window.XMLSerializer;

export const scraper = async () => {
  const config = {
    method: "GET",
    url: "http://www.rugbyweb.de/showdb.inc.php?league=BL2S",
  };
  const response = await axios(config);
  const dom = new JSDOM(response.data);
  const document = dom.window.document;

  const table = document.querySelector(".nodec");
  if (!table) throw new Error("Table not found");
  const tableString = new XMLSerializer().serializeToString(table);
  const string = `<!DOCTYPE html>
<html lang="en">
<link rel="stylesheet" type="text/css" href="style.css">
<bod>${tableString}</body>
</html>`;

  return string;
};
