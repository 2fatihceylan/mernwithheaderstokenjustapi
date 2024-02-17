const PostSchema = require('../models/post.js');


const createPost = async (req,res)=>{
    try{

        const newPost = await PostSchema.create(req.body);

        res.status(201).json({
            newPost
        })

    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

 


const getPosts = async (req,res)=>{
    try{

        const posts = await PostSchema.find();

        res.status(200).json({
            posts
        })

    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}


const getDetail = async (req,res)=>{
    try{

        const {id} =req.params;

        const post = await PostSchema.findById(id);

        res.status(200).json({
            post
        })

    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}


const updatePost = async (req,res)=>{
    try{

        const {id} =req.params;

        const post = await PostSchema.findByIdAndUpdate(id, req.body, {new: true});

        res.status(200).json({
            post
        })

    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

const deletePost = async (req,res)=>{
    try{

        const {id} =req.params;

        const post = await PostSchema.findByIdAndDelete(id);

        res.status(200).json({
            message: `The post with id:${id} is deleted`,
            post
        })

    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}


const searchPost = async ( req, res) =>{

    const {search, tag} = req.params;

    try{
        const title = new RegExp(search, "i");

        const posts = await PostSchema.find({$or: [{title}]})

        res.status(200).json({
            posts
        })
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    createPost,
    getDetail,
    getPosts,
    updatePost,
    deletePost,
    searchPost
}