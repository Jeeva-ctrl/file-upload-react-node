const express = require("express");
const multer = require("multer");
const upload = require("./upload");
const cors = require("cors");

const app = express();

const whiteList = ["http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed BY CORS"));
    }
  },
  Credential: true,
};
app.use(cors(corsOptions));

app.post("/upload_file", upload.single("file"), (req, res) => {
  if (!req.file) {
    throw Error("FILE_MISSING");
  } else {
    res.send({ status: "success" });
  }
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.statusCode = 400;

    res.send({ code: err.code });
  } else if (err) {
    if (err.message === "FILE_MISSING" || err.message === "INVALID_TYPE") {
      res.statusCode = 500;
      res.code = 400;
      res.send({ code: "GENERIC_ERROR", message: err.message });
    } else {
      res.statusCode = 500;
      res.send({ code: "GENERIC_ERROR", message: err.message });
    }
  }
});

const server = app.listen("8080", () => {
  const port = server.address().port;
  console.log("App started at http://localhost:%s", port);
});
