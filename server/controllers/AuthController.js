const USERS = require('../modal/USER.jsx');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_S = "hehjbfjbsjbk@djfn";

register = async (req, res) => {
    // Add logic to decode body
    // body should have email and password
    try {
        // console.log(req);
        const email = req.body.email;
        const password = req.body.password;
        console.log(email, password);
        console.log(USERS);

        const existinguser = await USERS.findOne({ email });

        // console.log(existinguser);
        if (existinguser) {
            return res.status(500).json({ "msg": "Email id already exist!" });
        }

        //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)

        const hashedpassword = await bcrypt.hash(password, 10);
        // console.log(USERS.users.countDocuments({}));
        // let coll = leetcode.collection('users').count();
        let user = await USERS.create({
            password: hashedpassword,
            email: email,
        });
        // console.log(user);
        // SUBMISSIONS.push(user);
        const data = {
            user: {
                _id: user._id
            }
        }
        // console.log(user);
        await user.save();
        // console.log(data);
        var token = jwt.sign(data, JWT_S);
        res.status(200).json({ token });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error occured!" });
    }

};

login = async (req, res) => {

    try {
        // Add logic to decode body
        // body should have email and password
        const email = req.body.email;
        const password = req.body.password;
        // console.log(USERS);
        const detail = await USERS.findOne({ email });

        if (!detail) {
            const err = 'No such Email exist';
            throw err;
        }

        const hashedpassword = detail.password;
        const compare_password = bcrypt.compare(password, hashedpassword);

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


};

module.exports = { register, login };
