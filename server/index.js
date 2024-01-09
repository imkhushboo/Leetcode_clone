const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const mongodb = require('./database/db.jsx');
require('dotenv').config();
const app = express()
app.use(express.json())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
const port = process.env.PORT || 3001;
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors());

app.use(cors(corsOptions));

app.use('/', require('./routes/AuthRoute.js'));
app.use('/', require('./routes/BlogRoute.js'));
app.use('/', require('./routes/ProblemRoute.js'));
app.use('/', require('./routes/SubmissionRoute.js'));

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

// app.get('/addproblem', authAdmin, (req, res) => {

//     try {
//         const newProblem = req.body.problem;
//         QUESTIONS.push({ ...newProblem, _id: QUESTIONS.length + 1 });
//         res.status(200).send("successful");

//     } catch (err) {
//         res.status(500).send(err);
//     }






app.listen(port, async (req, res) => {
    // res.status(301).redirect(`http://localhost:${port}`);
    console.log(`Example app listening on port ${port}`);
    mongodb();
})