

const SUBMISSIONS = [

]

submitProblemCode = async (req, res) => {
    try {
        const user = req.user;
        const id = user.userId;
        const problem_id = req.params.id[1].toString();
        const solution = req.body.solution;
        const random = Math.random();
        console.log(random);
        let answer = null;

        if (random >= 0.5) {
            answer = "Accepted";
        }
        else {
            answer = 'Rejected';
        }

        console.log(answer);

        console.log(problem_id);
        console.log(solution);
        let user_detail = SUBMISSIONS.find(x => x._id === id);

        console.log(user_detail);

        const index = SUBMISSIONS.findIndex(x => x === user_detail);
        console.log(index);

        // console.log(user_detail.hasOwnProperty('problem'));
        if (user_detail.hasOwnProperty('problem')) {
            let pp = user_detail.problem;

            let temp = pp.find(x => x.problem_id === problem_id);

            const nindex = pp.findIndex(x => x === temp);
            // console.log("temp", temp);
            if (temp) {

                pp[nindex].submission.push({
                    solution,
                    solution_id: pp[nindex].submission.length + 1,
                    Acceptance: answer
                })
                // console.log(pp[nindex].submission);
            }
            else {
                pp.push({ problem_id: problem_id, submission: [{ solution_id: 1, solution, Acceptance: answer }] });

            }
            user_detail.problem = pp;
        }
        else {

            console.log('yahan hora');
            user_detail = { ...user_detail, problem: [{ problem_id: problem_id, submission: [{ solution_id: 1, solution, Acceptance: answer }] }] }

        }

        console.log(user_detail.hasOwnProperty('problem'));
        console.log(user_detail);
        // let hh = user_detail.problem;
        // console.log(hh);
        SUBMISSIONS[index] = user_detail;
        console.log(SUBMISSIONS);
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
        const problem_id = req.params.id[1];
        // console.log(problem_id);
        const user_detail = SUBMISSIONS.find(x => x._id == id);
        console.log(user_detail);

        const submissions = user_detail.problem.find(x => x.problem_id === problem_id).submission;
        // console.log(sub);
        if (!submissions) {
            return res.status(200).json({ msg: 'No submission yet!' });
        }

        // const total_submission = SUBMISSIONS.find(x => x.problem_id == problem_id).total_submission;

        // console.log(total_submission);
        res.status(200).json({ submissions: submissions });

    }
    catch (err) {
        res.status(500).send(err);
    }

};


fetchAllSubmissions = (req, res) => {
    //shows all the submission of user
    try {
        const user = req.user;
        const id = user.userId;

        const user_detail = SUBMISSIONS.find(x => x._id === id);
        console.log(user_detail.problem);


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
