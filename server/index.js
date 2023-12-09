const express = require('express');
const bcrypt = require('bcryptjs');
var cors = require('cors');
var jwt = require('jsonwebtoken');
const JWT_S = "hehjbfjbsjbk@djfn";
var bodyParser = require('body-parser');
const { authUser } = require('./middleware/fetchUser');
// const fetchUser = require('./middleware/fetchUser');

const app = express()
const port = 3001
app.use(express.json())
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors());

app.use(cors(corsOptions));



const USERS = [];

const QUESTIONS = [{
    _id: 1,
    Title: "2. Add Two Numbers",
    Acceptance: "52%",
    Difficulty: "Medium",
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.You may assume the two numbers do not contain any leading zero, except the number 0 itself.",
    Examples: [{
        id: 1,
        Input: "l1 = [2,4,3], l2 = [5,6,4]",
        Output: "[7,0,8]",
        Explanation: "342 + 465 = 807."
    },
    {
        id: 2,
        Input: "l1 = [0], l2 = [0]",
        Output: "[0]"
    },
    {
        id: 3,
        Input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
        Output: "[8,9,9,9,0,0,0,1]]"
    }],
    Constraints: "The number of nodes in each linked list is in the range [1, 100].0 <= Node.val <= 9 .It is guaranteed that the list represents a number that does not have leading zeros."

},
{
    _id: 2,
    Title: "201. Add Two Numbers",
    Acceptance: "52%",
    Difficulty: "Medium",
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.You may assume the two numbers do not contain any leading zero, except the number 0 itself.",
    Examples: [{
        id: 1,
        Input: "l1 = [2,4,3], l2 = [5,6,4]",
        Output: "[7,0,8]",
        Explanation: "342 + 465 = 807."
    },
    {
        id: 2,
        Input: "l1 = [0], l2 = [0]",
        Output: "[0]"
    },
    {
        id: 3,
        Input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
        Output: "[8,9,9,9,0,0,0,1]]"
    }],
    Constraints: "The number of nodes in each linked list is in the range [1, 100].0 <= Node.val <= 9 .It is guaranteed that the list represents a number that does not have leading zeros."

},
{
    _id: 51,
    Title: "51. Maximum array",
    Acceptance: "52%",
    Difficulty: "Medium",
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.You may assume the two numbers do not contain any leading zero, except the number 0 itself.",
    Examples: [{
        id: 1,
        Input: "l1 = [2,4,3], l2 = [5,6,4]",
        Output: "[7,0,8]",
        Explanation: "342 + 465 = 807."
    },
    {
        id: 2,
        Input: "l1 = [0], l2 = [0]",
        Output: "[0]"
    },
    {
        id: 3,
        Input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
        Output: "[8,9,9,9,0,0,0,1]]"
    }],
    Constraints: "The number of nodes in each linked list is in the range [1, 100].0 <= Node.val <= 9 .It is guaranteed that the list represents a number that does not have leading zeros."

}];

const SUBMISSIONS = [

]


const BLOGS = []

app.post('/signup', async (req, res) => {
    // Add logic to decode body
    // body should have email and password
    try {
        // console.log(req);
        const email = req.body.email;
        const password = req.body.password;

        const existinguser = USERS.find(x => x.email === email);

        // console.log(existinguser);
        if (existinguser) {
            return res.status(500).json({ "msg": "Email id already exist!" });
        }

        //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)

        const hashedpassword = await bcrypt.hash(password, 10);
        let user = {
            _id: USERS.length + 1,
            password: hashedpassword,
            email: email,
        }
        USERS.push(user);
        SUBMISSIONS.push(user);
        const data = {
            user: {
                _id: user._id
            }
        }
        // console.log(data);
        var token = jwt.sign(data, JWT_S);
        res.status(200).json({ token });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error occured!" });
    }

})

app.post('/login', async (req, res) => {

    try {
        // Add logic to decode body
        // body should have email and password
        const email = req.body.email;
        const password = req.body.password;
        // console.log(USERS);
        const detail = USERS.find(x => (x.email === email));

        if (!detail) {
            const err = 'No such Email exist';
            throw err;
        }

        const hashedpassword = detail.password;
        const compare_password = await bcrypt.compare(password, hashedpassword);

        if (compare_password) {
            var token = jwt.sign(
                {
                    userId: detail._id,
                    email: detail.email
                }, JWT_S, { expiresIn: "24h" });

            res.status(200).json({ token });
        }
        else {
            const err = 'Wrong password';
            throw err;
        }

    } catch (err) {
        res.status(500).json({ "msg": err });
    }


})

app.post('/problemSet/all/:pageno', async (req, res) => {
    //return the user all the questions in the QUESTIONS array
    try {
        console.log(req.params);
        pageno = parseInt(req.params.pageno[1]);
        // console.log(pageno);
        const start = pageno * 50 - 49;
        const end = pageno * 50;
        console.log(start, end);
        const problem = QUESTIONS.filter(x => ((x._id >= start) && (x._id <= end)));
        console.log(problem);
        const filteredproblems = problem.map(x => ({
            _id: x._id,
            Title: x.Title,
            Acceptance: x.Acceptance,
            Difficulty: x.Difficulty
        }))
        // console.log(filteredproblems);
        res.status(200).json(filteredproblems);
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }

})




app.get('/problem/:id', async (req, res) => {


    try {
        const id = parseInt(req.params.id.split(':')[1]);
        // console.log(id);
        const problem = QUESTIONS.filter(x => x._id === id);
        // console.log(problem);
        if (!problem) {
            const err = 'No such Problems exist';
            throw err;
        }
        return res.status(200).json({ problem });

    }
    catch (err) {
        return res.status(500).send(err);
    }



})


app.post('/submit/:id', authUser, async (req, res) => {
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

        // console.log(problem_id);
        // console.log(solution);
        let user_detail = SUBMISSIONS.find(x => x._id === id);

        // console.log(user_detail);

        const index = SUBMISSIONS.findIndex(x => x === user_detail);
        // console.log(index);

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

            // console.log('yahan hora');
            user_detail = { ...user_detail, problem: [{ problem_id: problem_id, submission: [{ solution_id: 1, solution, Acceptance: answer }] }] }

        }

        // console.log(user_detail.hasOwnProperty('problem'));
        // console.log(user_detail);
        // let hh = user_detail.problem;
        // console.log(hh);
        SUBMISSIONS[index] = user_detail;
        // console.log(SUBMISSIONS);
        res.status(200).json({ Acceptance: answer })


    } catch (err) {
        res.status(500).json({ msg: err });
    }
})




app.get("/problems/:id/submissions", authUser, async (req, res) => {
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

});


app.post("/submissions", authUser, (req, res) => {
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


});

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



// })







// blog section


app.get('/blog', async (req, res) => {
    try {
        // console.log('blogs', BLOGS);
        const temp = BLOGS.map(x => x.blog.map(y => {
            const obj = {
                email: x.email,
                blog_id: y.blog_id,
                blog_detail: y.blog_detail
            }
            return obj;
        }))
        // console.log('temp', temp)

        let final_temp = [].concat(...temp);
        final_temp = final_temp.sort((a, b) => { a.blog_detail.time < b.blog_detail.time })
        // console.log(final_temp);

        res.status(200).json(final_temp);

    } catch (err) {
        res.status(500).json({ msg: err });
    }
})

app.delete('/blog/delete/:id', authUser, async (req, res) => {
    try {
        const user = req.user;
        const id = user.userId;
        const blogid = parseInt(req.params.id.split(':')[1]);

        console.log(blogid);


        const userdetails = BLOGS.find(x => x._id === id);

        if (userdetails) {
            const index = BLOGS.findIndex(x => x._id === id);

            const blogdetails = BLOGS[index].blog.find(x => x.blog_id === blogid);

            if (!blogdetails) {
                const err = 'No such blog exist !!';
                throw err;
            }
            else {
                let temp = BLOGS[index].blog.filter(x => x.blog_id !== blogid);
                let len = 1;
                temp = temp.map(x => {
                    const obj = {
                        blog_id: len++,
                        blog_detail: x.blog_detail
                    }
                    return obj;
                })

                console.log(temp);

                BLOGS[index].blog = temp;

                console.log(BLOGS[index].blog);
            }
        }
        else {
            const err = 'No such user exist';
            throw err;
        }

        console.log(BLOGS);

        res.status(200).json({ msg: 'Succesfully Deleted!!' });


    } catch (err) {
        res.status(500).json({ msg: err });
    }
})

app.put('/blog/add', authUser, async (req, res) => {
    try {
        // console.log(req);
        const user = req.user;
        const id = user.userId;
        const email = user.email;
        const blogid = req.body.blogid;
        // console.log(req.header("auth-token"));
        const blog = req.body.blogdetail;

        // console.log(blogid)

        // console.log(blog);

        const user_details = BLOGS.find(x => x._id === id);

        if (!user_details) {
            BLOGS.push({ _id: id, email, blog: [{ blog_id: 1, blog_detail: blog }] });
        }
        else {
            const index = BLOGS.findIndex(x => x._id === id);

            const blogdetails = BLOGS[index].blog.find(x => x.blog_id === blogid);
            if (blogdetails) {
                const blogindex = BLOGS[index].blog.findIndex(x => x.blog_id === blogid);
                // console.log(blogindex);
                BLOGS[index].blog[blogindex].blog_detail = blog;
            }
            else {
                const length = BLOGS[index].blog.length;
                BLOGS[index].blog.push({ blog_id: length + 1, blog_detail: blog })
            }

        }


        // console.log(BLOGS);
        res.status(200).json(BLOGS);

    } catch (err) {
        res.status(500).json({ msg: err });
    }
})




app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)
})