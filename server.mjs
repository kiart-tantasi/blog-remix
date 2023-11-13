// ref: https://remix.run/docs/en/main/start/quickstart#bring-your-own-server
import { createRequestHandler } from "@remix-run/express";
import express from "express";
import * as build from "./build/index.js";
import { broadcastDevReady } from "@remix-run/node";

const app = express();

app.use(express.static("public"));
app.use((req, _, next) => {
  console.log("Processing endpoint", req.path);
  next();
  return;
});
app.all("*", createRequestHandler({ build }));
app.listen(3000, () => {
  // When files change, Remix will restart your server for you,
  // but because you own your server, you also have to tell Remix when it has restarted
  // so Remix can safely send the hot updates to the browser.
  // ref: https://remix.run/docs/en/main/start/quickstart#development-workflow
  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(build);
  }
  console.log("App listening on http://localhost:3000");
});
