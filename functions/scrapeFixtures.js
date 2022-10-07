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

  const blankCell = document.createElement("td");

  let brokenUpCells = [];
  stuStaFix.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const dateCells = [cells["0"], blankCell, cells["1"]];
    dateCells[0].classList.add("align-right");
    dateCells.forEach((cell) => cell.classList.add("date-cell"));
    const teamCells = [cells["2"], cells["3"], cells["4"]];
    teamCells.forEach((cell) => cell.classList.add("team-cell"));
    teamCells[0].classList.add("align-right");
    brokenUpCells = [...brokenUpCells, dateCells, teamCells];
    if (cells.length > 6) {
      const resultsCells = [cells["5"], cells["6"], cells["7"]];
      resultsCells.forEach((cell) => cell.classList.add("results-cell"));
      resultsCells[2].classList.add("align-left");
      brokenUpCells = [...brokenUpCells, resultsCells];
    } else {
      const emptyCell = document.createElement("td");
      emptyCell.classList.add("empty-row-cell");
      emptyCell.colSpan = "3";
      brokenUpCells = [...brokenUpCells, [emptyCell]];
    }
  });

  const stringRows = brokenUpCells.map((row) => {
    console.log(row);
    return `<tr>
    ${row.map((cell) => new XMLSerializer().serializeToString(cell)).join("")}
    </tr>`;
  });
  const fixtureString = `<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" type="text/css" href="fixture-style.css">
</head>
<body>
  <table>
  ${stringRows.map((item) => item).join("")}
  <tr>
    <td colspan="7" class="link">
      <a href="https://www.RugbyWeb.de/" title="RugbyWeb.de" target="_blank" rel="noreferrer">&copy; RugbyWeb.de</a>
    </td>
  </tr>
  </table>
  </body>
  </html>`;
  return fixtureString;
};
