const express = require('express');
const router = express.Router();
const { submitProblemCode, fetchAllSubmissions, fetchSelectedSubmission } = require('../controllers/SubmissionController');
const { authUser } = require('../middleware/fetchUser');


router.post('/submit/:id', authUser, submitProblemCode);
router.get("/problems/:id/submissions", authUser, fetchSelectedSubmission);
router.post("/submissions", authUser, fetchAllSubmissions);

module.exports = router;

