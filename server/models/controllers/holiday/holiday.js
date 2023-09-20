const holiday = require('../../entity/holiday');
const db = require('../../index')
const Holiday = db.HOLIDAY;

const add_holiday = async (req, res) => {
  try {

    let holiday = await Holiday.create(req.body);
    res.status(200).send({ message: "event created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};


const get_holiday = async (req, res) => {
  try {
    let upcoming_holiday = await Holiday.findAll();
    if (upcoming_holiday) {
      res.send({ statusCode: 200, upcoming_holiday });
    } else {
      res.status(400).send({ statusCode: 400, message: "No data" });
    }
  } catch (error) {
    res.status(500).send({ statusCode: 400, message: "Internal error" });
  }
};

module.exports = {
  add_holiday,
  get_holiday,
};