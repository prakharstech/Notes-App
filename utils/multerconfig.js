const multer = require('multer');
// const crypto = require('crypto');
// const path = require('path')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/images')
//     },
//     filename: function (req, file, cb) {
//       crypto.randomBytes(12, (err,bytes)=>{
//         const fn = bytes.toString('hex') + path.extname(file.originalname)
//         cb(null, fn);
//       })
      
//     }
//   })

//   const upload = multer({ storage: storage })

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png/;
        const isValid = allowed.test(file.mimetype);
        cb(null, isValid);
    }
});


  module.exports = upload;