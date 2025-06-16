import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    auther:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    lecture: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Lecture',
    required: false,
    },
    tags: [String],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },

},{timestamps:true});

export default mongoose.model('Post',postSchema);