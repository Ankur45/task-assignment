const router = require('express').Router();
const Project = require('../controllers/project');
const Projects = new Project();

router.post('/addProject', Projects.addNewProject);
router.post('/getProject', Projects.getProject);

module.exports = router;
