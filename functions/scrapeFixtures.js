import axios from "axios";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
global.XMLSerializer = new JSDOM().window.XMLSerializer;
global.NodeList = new JSDOM().window.NodeList;

export const fixtures = async (league) => {
  const config = {
    method: "GET",
    url: `http://www.rugbyweb.de/showdb.inc.php?league=${league}&layout=rw2`,
  };
  const response = await axios(config);
  const dom = new JSDOM(response.data);
  const document = dom.window.document;
  const fixturesTable = document.querySelector(".games");
  const rows = fixturesTable.querySelectorAll("tr");
  let stuStaFix = [];

  rows.forEach((row) => {
    for (let i = 0; i < row.cells.length; i++) {
      if (row.cells[i]?.textContent.includes("SV StuSta Freimann")) {
        stuStaFix.push(row);
        return;
      }
    }
  });

  const stringRows = stuStaFix.map((row) =>
    new XMLSerializer().serializeToString(row)
  );
  const fixtureString = `<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" type="text/css" href="fixture-style.css">
</head>
<body>
  <table>
  ${stringRows.map((item) => item)}
  </table>
  </body>
  </html>`;
  return fixtureString;
};
