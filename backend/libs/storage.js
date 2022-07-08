const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage/imgs') //Folder donde se guardara la imagen
    },
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.png`)
    }
})

const upload = multer({storage})

module.exports = upload