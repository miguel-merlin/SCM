const multer = require('multer')
const AppError = require('../utils/appError')

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image!, Please upload only images', 400), false);
  }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });


//For disk Storage
/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage/imgs') //Folder donde se guardara la imagen
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.png`)
    },
})

const upload = multer({ 
    storage: storage,
    fileFilter: multerFilter
 }) */

module.exports = upload