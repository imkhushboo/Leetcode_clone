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


fetchAllProblem = async (req, res) => {
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

};




fetchProblem = async (req, res) => {


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



};

module.exports = { fetchAllProblem, fetchProblem };
