// import model
const Post = require("../models/postModel") ;
const Comment = require("../models/commentModel") ;

// bussiness logic
exports.createComment = async (req,res) => {
    try{
        // fetch data from req body
        const {post,user,body} = req.body ;
        // create a comment object
        const comment = new Comment({
            post,user,body
        });
        // save new comment into db
        const savedComment = await comment.save() ;

        // find post by Id, add new comment to its commen6t array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push:{comments:savedComment._id}}, {new:true})
                            .populate("comments") // populate comments array with comments documents
                            .exec() ;
        res.json({
            post:updatedPost,
        }) ;           
    }
    catch(error) {
        return res.status(500).json({
            error: "Error while creating comment"
        })
    }
};
