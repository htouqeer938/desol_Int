const { authJwt } = require("../middlewares");
const controller = require("../controllers/cars.controller");
const multer = require("multer");

module.exports = function (app) {
      app.use(function (req, res, next) {
            res.header(
                  "Access-Control-Allow-Headers",
                  "Origin, Content-Type, Accept"
            );
            next();
      });

      const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                  cb(null, './uploads');
            },
            filename: function (req, file, cb) {
                  cb(null, file.originalname);
            }
      });

      const uploadImg = multer({ storage: storage }).single('image');

      app.post("/api/upload_image", uploadImg, controller.uploadImage);

      app.post("/api/create_car", controller.createCar);
}