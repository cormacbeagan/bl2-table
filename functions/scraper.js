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

  const tableRows = innerTable.querySelectorAll("tr");
  let newTableRows = [];
  tableRows.forEach((row, i) => {
    if (i === 0 || i === 1) return;
    const cells = Array.from(row.querySelectorAll("td")).slice(0, 4);
    newTableRows.push(`<tr>
      ${cells
        .map((cell) => new XMLSerializer().serializeToString(cell))
        .join("")}</tr>`);
  });

  const htmlString = `<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
  <table>
  <tr>
    <td class="center">Pl.</td>
    <td class="header">Mannschaft</td>
    <td class="header">Sp.</td>
    <td class="header">Pkt.</td>
  </tr>
  ${newTableRows.map((item) => item).join("")}
  <tr>
    <td colspan="7" class="link">
      <a href="https://www.RugbyWeb.de/" title="RugbyWeb.de" target="_blank" rel="noreferrer">&copy; RugbyWeb.de</a>
    </td>
  </tr>
  </table>
  </body>
  </html>`;

  return htmlString;
};
