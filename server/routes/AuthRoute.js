
const express = require('express');
const router = express.Router();
const { authUser } = require('../middleware/fetchUser')
const { register, login, updateProfile } = require('../controllers/AuthController');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/static/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB file size limit
});

router.post('/signup', register);

router.post('/login', login);

router.put('/updateProfile', upload.single('image'), authUser, updateProfile);
module.exports = router;

