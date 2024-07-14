import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const generateUniqueFileName = (originalname) => {
  const ext = path.extname(originalname);
  return `${uuidv4()}${ext}`;
};

const ensureUploadsFolderExists = () => {
  const dir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

ensureUploadsFolderExists(); // Ensure the uploads folder exists

export { upload, generateUniqueFileName };
