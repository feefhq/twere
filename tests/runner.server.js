/**
 * This is the server-side of a really rudimentary test runner, which runs
 * tests in headless Chrome via Puppeter. It's currently MVP.
 */
const fs = require('fs');
const http = require('http');
const path = require("path");
const url = require('url');
const puppeteer = require('puppeteer');

const port = 3000;

mimeTypes = {
  "html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "png": "image/png",
  "js": "text/javascript",
  "mjs": "text/javascript",
  "css": "text/css"
};

const requestHandler = (request, response) => {

  const uri = url.parse(request.url).pathname;
  const filename = path.join(process.cwd(), uri);

  fs.exists(filename, exists => {
    if (!exists) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.write('404 Not Found\n');
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory())
      filename += '/index.html';

    fs.readFile(filename, 'binary', (err, file) => {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.write(err + '\n');
        response.end();
        return;
      }

      var mimeType = mimeTypes[filename.split('.').pop()];

      if (!mimeType) {
        mimeType = 'text/plain';
      }

      response.writeHead(200, { 'Content-Type': mimeType });
      response.write(file, 'binary');
      response.end();
    });
  });
};

const successHandler = () => {
  console.log(`Test server is listening on ${port}`);
}

const errHandler = (err) => {
  if (err)
    return console.log('Something bad happened', err);
}

const server = http.createServer(requestHandler);

(async () => {
  await server.listen(port, errHandler, successHandler);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => {
    for (let i = 0; i < msg.args().length; ++i)
      console.log(`🧪  ${msg.text()}`);
  });
  await page.goto(`http://127.0.0.1:${port}/tests/runner.html`, {waitUntil: 'networkidle0'});
  await browser.close();
  await server.close();
})();
