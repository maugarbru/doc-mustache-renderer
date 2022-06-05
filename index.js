const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");
const _index = require("./routes/_index");
const http = require("http");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(cors());
app.use("/api/v1/", _index);

if (process.env.NODE_ENV === "production") {
  const httpServer = http.createServer(app);
  httpServer.listen(process.env.PORT, () => {
    console.log("HTTP Server running on port " + process.env.PORT);
  });
} else if (process.env.NODE_ENV === "development") {
  const port = 3001;
  app.listen(port, () => {
    console.log(`API http://localhost:${port}`);
  });
} else {
  throw new Error("ENV not set");
}
