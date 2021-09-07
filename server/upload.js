const multer = require("multer");
const storage = multer.diskStorage({
  //specify the destination where the file need to be saved
  destination: (req, file, cb) => {
    cb(null, "./files");
  },
  //Specify the name of the file. date is prefixed to avoid overwrite of files.
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("INVLAID_TYPE"));
    }
  },
});

module.exports = upload;
