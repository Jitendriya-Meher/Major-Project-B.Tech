const multer = require('multer');

// storage configuration
const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null,"./uploads");
    },
    filename: (req,file,callback) => {
        const filename = `image-${Date.now()}.${file.originalname}`;
        callback(null,filename);
    }
});

// filter
const fileFilter = (req, file, callback) => {

    if( file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" ) {
        callback(null, true);
    }
    else{
        callback(null, true);
        return callback(new Error("Only png, jpg, jpeg formate allowed "));
    }
}

const imageUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = imageUpload;