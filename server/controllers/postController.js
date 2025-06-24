import Message from '../models/message.model.js';
import Post from '../models/post.model.js'

export const createPost = async (req,res)=>{
    try{
        const {content , lecture , tags}    = req.body;

        const newPost = new Post ({
            content,
            auther : req.user._id,
            lecture : lecture || null,
            tags,
        })

        const savedPost = await newPost.save()
        res.status(201).json(savedPost)

    }catch(error){
      res.status(400).json({error:Message})
    }
};

export const getAllPosts = async (req,res)=>{
   try{
    const posts = await Post.find()
    .populate('auther','username email')
    .populate('lecture','name subject')
    .sort ({createdAt: -1 })
    res.status(200).json(posts);
   }catch(error){
   res.status(500).json({error:Message})
   }
};

export const getPostById = async (req,res)=>{
    try{

        const post = await Post.findById(req.params.id)
        .populate('auther', 'username')
        .populate('lecture', 'name');

        if(!post) return res.status(404).json('Post not found')
        res.status(200).json(post);

    }catch(error){
     res.status(500).json({error:Message})
    }
};

export const toggleLikePost = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
         if (!post) return res.status(404).json({ message: 'Post not found' });

         const userId = req.user._id;
         const index = post.likes.indexOf(userId)

         if(index === -1){
            post.likes.push(userId)
         }else{
            post.likes.splice(index, 1);
         }
          await post.save();
         res.status(200).json({ message: 'Like status updated', likes: post.likes.length });

    }catch(error){
           res.status(500).json({ error: error.message });
    }
};

export const deletePost = async (req,res)=>{
    try{
        const post = await Post.findById(req.params._id);
         if (!post) return res.status(404).json({ message: 'Post not found' });
         if (post.auther.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
         }
         await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' });
    }catch(error){
         res.status(500).json({ error: error.message });
    }
}
