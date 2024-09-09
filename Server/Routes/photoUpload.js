import express from 'express';
import {
  createPhotoCtrl,
  getPhotoCtrl,
} from '../controllers/photoController.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profiles');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const photoUpload = express.Router();

photoUpload.post('/Photo', upload.single('image'), createPhotoCtrl);
photoUpload.get('/image/:id', getPhotoCtrl);

export default photoUpload;
