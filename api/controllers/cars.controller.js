const config = require("../config/auth.config");
const db = require("../models");
const Car = db.car;

exports.uploadImage = (req, res) => {
      const upload = {
            image: req.file.path,
            message: 'Image upload successfully'
      }
      res.status(200).send(upload);
};

exports.createCar = (req, res) => {
      const car = new Car({
            model: req.body.model,
            price: req.body.price,
            phone: req.body.phone,
            city: req.body.city,
            pictures: req.body.pictures
      });
      car.save((err, user) => {
            if (err) {
                  res.status(500).send({ message: err });
                  return;
            }
            return res.status(200).send({ message: "Car created!" });
      })
}