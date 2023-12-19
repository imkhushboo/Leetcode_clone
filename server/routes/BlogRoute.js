const express = require('express');
const router = express.Router();
const { fetchBlog, addBlog, deleteBlog } = require('../controllers/BlogController');
const { authUser } = require('../middleware/fetchUser');




router.get('/blog', fetchBlog);
router.delete('/blog/delete/:id', authUser, deleteBlog);
router.put('/blog/add', authUser, addBlog);


module.exports = router;

