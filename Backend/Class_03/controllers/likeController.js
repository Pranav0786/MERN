// import models
const Post = require("../models/postModel") ;
const Like = require("../models/likeModel") ;

// like a post
exports.likePost = async (req,res) => {
    try{
        const {post,user} = req.body; ;
        const like = new Like({
            post,user,
        });
        const savedLike = await like.save() ;

        // update post collection basis on this
        const updatedPost = await Post.findByIdAndUpdate(post,
                                                        {$push: {likes:savedLike._id}},
                                                        {new:true}) ;

        res.json({
            post:updatedPost,
        }) ;
    }
    catch(error){
        return res.status(500).json({
            error: "Error while liking post"
        })
    }
}


// unlike post
exports.unlikePost = async (req,res) => {
    try{
        const {post,like} = req.body;
        // find and delete from like collection
        const deletedLike = await Like.findOneAndDelete({post:post, _id:like}) ;

        // update teh post collection
        const updatedPost = await Post.findByIdAndUpdate(post,
                                                        {$pull:{likes:deletedLike._id}},
                                                        {new:true}) ;

        res.json({
            post:updatedPost,
        });
    }
    catch(error){
        return res.status(500).json({
            error: "Error while unliking post"
        })
    }
}



exports.dummyLink = (req,res) => {
    res.send(`<h1>This is dummy Page</h1>`)
};