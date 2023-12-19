const express = require('express');
const router = express.Router();
const { fetchAllProblem, fetchProblem } = require('../controllers/ProblemController');

router.post('/problemSet/all/:pageno', fetchAllProblem);

router.get('/problem/:id', fetchProblem);

module.exports = router;

