// Copyright (c) Facebook, Inc. and its affiliates.
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import http from "http";
import finalhandler from "finalhandler";
import serveStatic from "serve-static";
import puppeteer from "puppeteer";

export async function createServer() {
  const serve = serveStatic("./");
  const server = http.createServer(function(req, res) {
    var done = finalhandler(req, res);
    serve(req, res, done);
  });

  await new Promise((resolve, reject) => {
    const startServer = () => {
      server.once("error", e => {
        if (e.code === "EADDRINUSE") {
          server.close(startServer);
        }
      });
      server.listen(4004, "localhost", err => {
        if (err) {
          reject("Failed to listen on port 4004");
        } else {
          const address = server.address();
          console.log(`Listening on http://${address.address}:${address.port}`);
          resolve();
        }
      });
    };
    startServer();
  });
  return server;
}

export async function getBrowserAndPage(url) {
  const browser = await puppeteer.launch({
    args: ["--disable-lcd-text"],
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "load" });

  return { browser, page };
}

export async function getServerAndURL(path) {
  const server = await createServer();
  const address = server.address();
  const port = address.port;
  const url = `http://localhost:${port}/${path}`;
  return {
    server,
    url
  };
}

export async function closeBrowserAndServer(browser, server) {
  browser.close();
  await new Promise(resolve => server.close(resolve));
}
