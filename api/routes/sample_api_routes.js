
const express = require("express");
const router = express.Router();
const multer = require('multer');
const SampleApiController = require('../controllers/sample_api_controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/');
    },
    filename: function (req, file, cb) {
        cb(null,Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, limits: {
        fieldSize: 1024 * 1024 * 5 // 5 mb
    },
    //fileFilter: fileFilter
});


router.get("/getCall", SampleApiController.getCall);
router.get("/getCallList", SampleApiController.getCallList);
router.get("/getCallPathParam/:id/:name/:age",SampleApiController.getCallPathParam);
router.get("/getCallQueryParam",SampleApiController.getCallQueryParam);
router.post("/postCallBody",SampleApiController.postCallBody);
router.post("/postCallFormData",upload.array(),SampleApiController.postCallFormData);
router.post("/singleImageUpload",upload.single('image'),SampleApiController.singleImageUpload);
router.post("/singleImageUploadWithData",upload.single('image'),SampleApiController.singleImageUploadWithData);
router.post("/multipleImageUploadWithData",upload.array('image'),SampleApiController.multipleImageUploadWithData);

module.exports = router;