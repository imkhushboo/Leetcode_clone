

const SUBMISSIONS = require("../modal/SUBMISSION.jsx");

submitProblemCode = async (req, res) => {
    try {
        const user = req.user;
        const id = user.userId;
        const problem_id = parseInt(req.params.id.split(":")[1]);
        const solution = req.body.solution;
        const random = Math.random();
        console.log(random);
        let answer = null;
        console.log(id);

        if (random >= 0.5) {
            answer = "Accepted";
        }
        else {
            answer = 'Rejected';
        }

        console.log(answer);

        console.log(problem_id);
        console.log(solution);
        let user_detail = await SUBMISSIONS.findOne({ user: id });

        console.log(user_detail);

        if (user_detail) {
            console.log("here!!");
            const detail = user_detail.problem.filter(x => x.problem_id === problem_id);
            console.log(detail);

            if (detail.length) {

                const len = detail[0].submission.length + 1;
                const result = await SUBMISSIONS.updateOne({
                    user: id,
                    "problem.problem_id": problem_id
                },
                    {
                        $push: {
                            "problem.$.submission": {
                                solution_id: len,
                                solution,
                                Acceptance: answer

                            }
                        }
                    }
                );
                console.log(result);


            }
            else {
                const result = await SUBMISSIONS.updateOne({
                    user: id
                },
                    {
                        $push: {
                            problem: {
                                problem_id,
                                submission: {
                                    solution_id: 1,
                                    solution,
                                    Acceptance: answer
                                }
                            }
                        }
                    });

                console.log(result);
            }



        }
        else {
            const submission = await SUBMISSIONS.create({
                user: id,
                problem: [{
                    problem_id: problem_id,
                    submission: [
                        {
                            solution_id: 1,
                            solution,
                            Acceptance: answer
                        }
                    ]
                }]

            });
            const result = await submission.save();

            console.log(result);

        }

        res.status(200).json({ Acceptance: answer })


    } catch (err) {
        res.status(500).json({ msg: err });
    }
};




fetchSelectedSubmission = async (req, res) => {
    try {
        const user = req.user;
        const id = user.userId;
        // console.log(id);
        console.log(req.params);
        const problem_id = parseInt(req.params.id.split(':')[1]);
        console.log(problem_id);

        const detail = await SUBMISSIONS.find({
            user: id,
        });
        const problem = detail[0].problem.filter(x => x.problem_id === problem_id);
        console.log(problem);
        const result = problem[0].submission;
        console.log(result);
        if (!result) {
            return res.status(200).json({ msg: 'No submission yet!' });
        }

        // const total_submission = SUBMISSIONS.find(x => x.problem_id == problem_id).total_submission;

        // console.log(total_submission);
        res.status(200).json({ submissions: result });

    }
    catch (err) {
        res.status(500).send(err);
    }

};


fetchAllSubmissions = async (req, res) => {
    //shows all the submission of user
    try {
        const user = req.user;
        const id = user.userId;

        const user_detail = await SUBMISSIONS.findOne({ user: id });
        console.log(user_detail);


        const answer = user_detail.problem.map(x => x.submission.map(y => {
            return {

                'problem_id': x.problem_id,
                'Acceptance': y.Acceptance,
                'Solution': y.solution

            }


        }

        ));
        const final_answer = [].concat(...answer);
        res.status(200).json(final_answer);



    } catch (err) {
        res.status(500).send(err);
    }


};

module.exports = { fetchAllSubmissions, fetchSelectedSubmission, submitProblemCode };
