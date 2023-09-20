const db = require('../../index')
const Project = db.PROJECT;

const add_project = async (req, res) => {
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


const user_project = async (req, res) => {
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


const admin_project = async (req, res) => {
  try {
    let getProject = await Project.findAll();
    if (getProject) {
      res.send({ statusCode: 200, getProject });
    } else {
      res.status(400).send({ statusCode: 400, message: "No data" });
    }
  } catch (error) {
    res.status(500).send({ statusCode: 400, message: "Internal error" });
  }
};
const update_project = async (req, res) => {
  try {
    let getProject = await Project.findAll();
    if (getProject) {
      res.send({ statusCode: 200, getProject });
    } else {
      res.status(400).send({ statusCode: 400, message: "No data" });
    }
  } catch (error) {
    res.status(500).send({ statusCode: 400, message: "Internal error" });
  }
};

module.exports = {
  add_project,
  user_project,
  admin_project,
  update_project,
};