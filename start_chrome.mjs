import path from "path";
import fs from "fs";
import * as ChromeLauncher from "chrome-launcher";
import express from "express";
import https from "https";

const key = fs.readFileSync("localhost-key.pem", "utf-8");
const cert = fs.readFileSync("localhost.pem", "utf-8");

const app = express();
const port = 8000;

app.use(express.static(path.join(process.cwd())));

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
https.createServer({ key, cert }, app).listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});

ChromeLauncher.launch({
  startingUrl: `https://localhost:${port}`,
  chromeFlags: [
    "--disable-web-security",
    "--allow-insecure-localhost",
    "--autoplay-policy=no-user-gesture-required",
  ],
}).then((chrome) => {
  console.log(`Chrome debugging port running on ${chrome.port}`);
});
