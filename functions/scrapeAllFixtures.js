import jsdom from "jsdom";
import { fixtures } from "./scrapeFixtures.js";

const zweite = "RLbayern";
const erste = "BL2S";
const damen = "D7Fs";

export const allFixtures = async () => {
  const ersteTableObject = await fixtures(erste, true);
  const zweiteTableObject = await fixtures(zweite, true);

  const allDateKeys = [
    ...new Set([
      ...Object.keys(ersteTableObject),
      ...Object.keys(zweiteTableObject),
    ]),
  ].sort((a, b) => Number(a) - Number(b));
  const allFixturesList = [];
  allDateKeys.forEach((key) => {
    if (ersteTableObject[key]) {
      allFixturesList.push(ersteTableObject[key].date);
      allFixturesList.push(ersteTableObject[key].team);
      if (ersteTableObject[key].result) {
        allFixturesList.push(ersteTableObject[key].result);
      }
      if (zweiteTableObject[key]) {
        allFixturesList.push(zweiteTableObject[key].team);
        if (zweiteTableObject[key].result) {
          allFixturesList.push(zweiteTableObject[key].result);
        }
      }
    } else {
      if (zweiteTableObject[key]) {
        allFixturesList.push(zweiteTableObject[key].date);
        allFixturesList.push(zweiteTableObject[key].team);
        if (zweiteTableObject[key].result)
          allFixturesList.push(zweiteTableObject[key].result);
      }
    }
  });

  const fixtureString = `<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" type="text/css" href="fixture-style.css">
</head>
<body>
  <table>
  ${allFixturesList.map((item) => item).join("")}
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
