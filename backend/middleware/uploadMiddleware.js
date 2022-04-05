const multer = require('multer');
const path = require('path');

const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('unsupported file format!!'));
  }
};

const storage = multer.diskStorage({});
const uploadFile = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

module.exports = {
  uploadFile,
};
