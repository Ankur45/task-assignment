const router = require('express').Router();
const Skill = require('../controllers/skills');

const Skills = new Skill();

router.post('/addSkill', Skills.addSkill);
router.post('/getSkill', Skills.getSkill);

module.exports = router;
