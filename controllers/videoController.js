'use strict'
const firebase = require("../db");
const formidable = require("formidable");
const Video = require('../models/video');
const firestore = firebase.firestore();

//https://firebasestorage.googleapis.com/v0/b/video-contant-manager.appspot.com/o/WhatsApp%20Video%202021-01-19%20at%2011.18.52%20AM.mp4?alt=media
const uri =
    "https://firebasestorage.googleapis.com/v0/b/video-contant-manager.appspot.com/o/";


module.exports.addVideo = async (req, res) => {
    try {
        const data = req.body;
        await firestore.collection("videos").doc().set(data);
        res.send("record saved succesfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports.list = async (req, res) => {
    const storage = firebase.storage();
    listRef = storage.ref().child("upload");
    var data = await listRef.listAll();
    var json = [];
    data.items.forEach(function (itemRef) {
        let dosya = uri + itemRef.name + "?alt=media";
        json.push(dosya);
    });
    res.status(200).json(json);
};

module.exports.upload = async (req, res) => {
    var form = new formidable.IncomingForm();
    const storage = firebase.storage();
    const ref = storage.ref().child("upload");
    try {
        form.parse(req, function (err, fields, files) {
            console.log(files.filetoupload);
            var file = files.filetoupload;
            //var blob = Blob([file], { type: "video/mp4" });
            var message = "This is my message.";
            ref.put(file).then(function (snapshot) {
                res.send(JSON.stringify(snapshot));
            });
        });
    } catch (error) {
        res.send(JSON.stringify(error));
    }
};
