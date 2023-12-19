const { BLOGS } = require('../modal/BLOG.jsx');

//blog section

fetchBlog = async (req, res) => {
    try {
        let temp = await BLOGS.find({}, { email: 1, blogs: 1 });

        temp = temp.map(x => x.blogs.map(y => {
            const obj = {
                email: x.email,
                blog_id: y.blog_id,
                blog_detail: y.blog_detail
            }
            return obj;
        }))

        let final_temp = [].concat(...temp);
        final_temp = final_temp.sort((a, b) => { a.blog_detail.time < b.blog_detail.time })
        console.log(final_temp);

        res.status(200).json(final_temp);

        // res.status(200).json(temp);
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};


deleteBlog = async (req, res) => {
    try {
        const user = req.user;
        const id = user.userId;
        const blogid = parseInt(req.params.id.split(':')[1]);

        console.log(blogid);

        const res = await BLOGS.updateOne({
            user: id,
            "blogs.blog_id": blogid
        },
            {
                $pull: {
                    blogs: {
                        blog_id: blogid
                    }
                }
            });
        console.log("deleted id", blogid);
        console.log(res);


        let len = 1;
        let arr = await BLOGS.find({ user: id });
        let newblogs = arr.map(x => x.blogs.map((y) => {
            return {
                blog_id: len++,
                blog_detail: y.blog_detail

            }

        }));

        console.log(newblogs[0]);

        const result = await BLOGS.updateOne(
            { user: id },
            {
                $set: {
                    blogs: newblogs[0]
                }
            }
        );




        console.log(result);

        res.status(200).json({ msg: 'Succesfully Deleted!!' });


    } catch (err) {
        res.status(500).json({ msg: err });
    }
};



addBlog = async (req, res) => {
    try {
        // console.log(req);
        const user = req.user;
        const user_id = user.userId;
        const email = user.email;
        let blogid = req.body.blogid;
        // console.log(user);
        console.log(user_id);
        console.log(email);

        const user_details = await BLOGS.findOne({ user: user_id });
        console.log(user_details);

        if (!user_details) {
            let blogs = await BLOGS.create(
                {
                    user: user_id,
                    email: email,
                    blogs: [{
                        blog_id: 1,
                        blog_detail: req.body.blogdetail
                    }]
                }
            )
            await blogs.save();
            // console.log(blogs);

        }
        else {

            const blog = await BLOGS.findOne({ user: user_id });

            var len = blog.blogs.length;
            console.log(len);

            if (!blogid) {
                const result = await BLOGS.updateOne({
                    user: user_id,
                },
                    {
                        $push: {
                            blogs: {
                                blog_id: len + 1,
                                blog_detail: req.body.blogdetail
                            }
                        }
                    });
                console.log(result);
            }
            else {
                const result = await BLOGS.updateOne(
                    {
                        user: user_id,
                        "blogs.blog_id": blogid
                    },
                    {
                        $set: {
                            "blogs.$.blog_detail": req.body.blogdetail
                        }
                    },
                );
                console.log(result);
            }



            res.status(200).json("Success!!");

        }
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};


module.exports = { fetchBlog, deleteBlog, addBlog };



