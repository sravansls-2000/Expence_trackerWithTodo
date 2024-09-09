import Photo from '../models/photo.js';

const createPhotoCtrl = async (req, res) => {
  const userID = req.body.id;

  const myPhoto = req.file.filename;
  try {
    const newPhoto = await Photo.create({
      myPhoto,
      userID,
    });

    res.json(newPhoto);
  } catch (error) {
    res.json(error);
  }
};
const getPhotoCtrl = async (req, res) => {
  try {
    const newPhoto = await Photo.find({
      userID: req.params.id,
    });

    res.json(newPhoto);
  } catch (error) {
    res.json(error);
  }
};

export { createPhotoCtrl, getPhotoCtrl };
