const Lampdb = require("../model/model");
const axios = require('axios').default;

//create and save new lamp API
exports.create = (req, res) => {
  if (!req.body) {
    res.stauts(400).send({ message: "content can't be empty" });
    return;
  }
  console.log(req.body);

  const lamp = new Lampdb({
    lampName: req.body.lampName,
    longitude: req.body.longitude,
    lattitude: req.body.lattitude,
    isActive: req.body.active,
    address: req.body.address,
  });

  //save in db
  lamp
    .save(lamp)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "some error has occured" });
    });
};

//retrieving lamps
exports.find = (req, res) => {
    let result = [];
  Lampdb.find()
    .then((lamp) => {
      result = lamp;
      if (req.query.address) {
          result = result.filter(lmp => lmp.address && lmp.address.toString().includes(req.query.address));
      }
      if (req.query.status) {
          if (req.query.status == 'defected') {
              result = result.filter(lmp => lmp.isActive == false);
            } else if (req.query.status == 'working') {
              result = result.filter(lmp => lmp.isActive == true);
          }
      }
  
      res.send(result);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message: err.message || "Something went wrong during retrieving",
        });
    });

};

//retrieving lamps
exports.findbyLampId = (req, res) => {
  const id = req.params.id;
  Lampdb.findById(id)
    .then((lamp) => {
      res.send(lamp);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong during retrieving",
      });
    });
};

const YOUR_API_KEY = 'key';
const latt = '12.939573';
const long = '77.698117';

//retrieving lamp id and update the address
exports.address = (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latt},${long}&key=${YOUR_API_KEY}`)
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    return res.send({ "hello": "kjsbhak" });
};

//update a lamp by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.stauts(400).send({ message: "data to update can't be empty" });
  }

  const id = req.params.id;
  const isLog = req.body.log;
  let logs = [];

  if (isLog == 'ON' || isLog == 'OFF') {
      Lampdb.findById(id).then((data) => {
        logs = data.logs;
        logs.push({ time: (new Date()).toString(), status: isLog });
        req.body.logs = logs;

        Lampdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then((data) => {
            if (!data) {
                res
                .status(404)
                .send({
                    message: `cannot update with lamp id ${id}. May be lamp not found`,
                });
            } else {
                res.send(data);
            }
            })
            .catch((err) => {
                res.status(500).send({ message: "error while updating" });
            });
      })
  } else {
    Lampdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `cannot update with lamp id ${id}. May be lamp not found`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "error while updating" });
    });
  }
};
