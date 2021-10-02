import axios from "axios";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
global.XMLSerializer = new JSDOM().window.XMLSerializer;

export const scraper = async (league) => {
  const config = {
    method: "GET",
    url: `http://www.rugbyweb.de/showdb.inc.php?league=${league}&layout=rw2`,
  };
  const response = await axios(config);
  const dom = new JSDOM(response.data);
  const document = dom.window.document;
  const table = document.querySelector(".nodec");
  const innerTable = table.querySelector(".table");
  const newRow = innerTable.insertRow(-1);
  const newCell = newRow.insertCell();
  newCell.colSpan = 7;
  newCell.className = "link";
  const anchor = document.createElement("a");
  const title = document.createTextNode(`&copy; RugbyWeb.de`);
  anchor.appendChild(title);
  anchor.title = "RugbyWeb link";
  anchor.href = "https://www.rugbyweb.de/";
  newCell.appendChild(anchor);
  if (!table) throw new Error("Table not found");
  const tableString = new XMLSerializer().serializeToString(table);
  const string = `<!DOCTYPE html>
<html lang="en">
<link rel="stylesheet" type="text/css" href="style.css">
<body>${tableString}</body>
</html>`;

  return string;
};
