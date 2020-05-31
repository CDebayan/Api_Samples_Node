const ImageModel = require('../models/ImageModel');

exports.getCall = (req, res, next) => {
    res.status(200).json({
        status: 1,
        student: {"id": 1, "name": "Dc", "age": 25},
    });
};

exports.getCallList = (req, res, next) => {
    res.status(200).json({
        status: 1,
        studentList: [
            {"id": 1, "name": "Debayan", "age": 25},
            {"id": 2, "name": "Madhura", "age": 30},
            {"id": 3, "name": "Jaya", "age": 64},
            {"id": 4, "name": "Nilanjan", "age": 69},
        ],
    });
};

exports.getCallPathParam = (req, res, next) => {
    const id = req.params.id;
    const name = req.params.name;
    const age = req.params.age;
    res.status(200).json({
        status: 1,
        student: {"id": id, "name": name, "age": age},
    });
};

exports.getCallQueryParam = (req, res, next) => {
    const id = req.query.id;
    const name = req.query.name;
    const age = req.query.age;
    res.status(200).json({
        status: 1,
        student: {"id": id, "name": name, "age": age},
    });
};

exports.postCallBody = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const age = req.body.age;
    res.status(200).json({
        status: 1,
        student: {"id": id, "name": name, "age": age},
    });
};

exports.postCallFormData = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const age = req.body.age;
    res.status(200).json({
        status: 1,
        student: {"id": id, "name": name, "age": age},
    });
};

exports.singleImageUpload = (req, res, next) => {
    const image=  req.file.filename;
    res.status(200).json({
        status: 1,
        imageUrl: "http://192.168.0.4:3000/images/" + image,
    });
};

exports.singleImageUploadWithData = (req, res, next) => {
   const image=  req.file.filename;
    const name = req.body.name;
    const age = req.body.age;
    res.status(200).json({
        status: 1,
        student: {"name": name, "age": age, "imageUrl" : "http://192.168.0.4:3000/images/" + image},
    });
};

exports.multipleImageUploadWithData = (req, res, next) => {
     const image=  req.files;
    const name = req.body.name;
    const age = req.body.age;

    var imageUrl = [];
    for (let  i = 0; i < image.length; i++) {
        imageUrl.push(new ImageModel("http://192.168.0.7:3000/images/" + image[i]['filename']));
    }

    res.status(200).json({
        status: 1,
        student: {"name": name, "age": age, "imageUrl" : imageUrl},
    });
};
