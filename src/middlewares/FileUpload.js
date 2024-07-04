import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only PDF, PNG, JPG, and JPEG files are allowed!'), false);
  }
  cb(null, true);
};
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
  fileFilter: fileFilter
});

export { upload };
