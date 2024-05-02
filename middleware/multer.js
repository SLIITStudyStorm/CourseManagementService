import multer from 'multer';

// Define storage for uploaded files
const thumbnailStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/thumbnails/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Set unique filename (you can customize this as needed)
    cb(null, Date.now() + '-' + file.originalname);
  }
});


// const thumbnailStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/thumbnails/'); // Destination folder for uploaded files
//     },
//     filename: function (req, file, cb) {
//       // Set unique filename (you can customize this as needed)
//       cb(null, Date.now() + '-' + file.originalname);
//     }
//   });

// Configure multer
const uploadThumbnail = multer({ storage: thumbnailStorage });

export { uploadThumbnail };
