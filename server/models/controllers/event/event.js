const db = require('../../index')
const Event = db.EVENT;


const add_event = async (req, res) => {
  try {
    const { projectName, allocation } = req.body;

    // Use Sequelize to create a new record in the Project table
    const project = await Project.create({ projectName, allocation });

    res.send('Record added successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while adding the record');
  }
};

const createEvent = async (req, res) => {
  try {

    let createEvent = await upComingEvents.create(req.body);
    res.status(200).send({ message: "event created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};


const update_event = async (req, res) => {
  console.log(req.body);
  let findEvent = await upComingEvents.findOne({
    where: { id: req.body.id },
  });
  if (findEvent) {
    let updateEvent = await db.upcomingEvents.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    res.status(200).send({ message: "Event updated" });
  } else {
    res.status(400).send({ message: "Error updating" });
  }
};


const get_event = async (req, res) => {
  try {
    let upcomingEvent = await upComingEvents.findAll();
    if (upcomingEvent) {
      res.send({ statusCode: 200, upcomingEvent });
    } else {
      res.status(400).send({ statusCode: 400, message: "No data" });
    }
  } catch (error) {
    res.status(500).send({ statusCode: 400, message: "Internal error" });
  }
};

module.exports = {
  add_event,
  update_event,
  get_event,
};