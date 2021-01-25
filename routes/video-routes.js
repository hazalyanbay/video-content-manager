const videoController = require("../controllers/videoController");
const { Router } = require("express");
const router = Router();

console.log("router");
router.post("/video", videoController.list);
router.post("/upload", videoController.upload);


module.exports = {
    routes: router
};
