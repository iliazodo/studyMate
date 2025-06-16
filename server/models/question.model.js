import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
    },
    lecture:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Lecture',
        required: true,
    },
    askedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tags:[String],
    upvotes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    downvotes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    image:{
        type: String,
    },
    codeSnippet:{
        type: String,
    },
    answers: [{
        answerText:{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User',
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
        Comments: [{
            text: String,
            commentedBy:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            createdAt:{
                type:Date,
                default: Date.now,
            }
        }]
    }],
    createdAt:{
        type:Date,
        default: Date.now,
    },
},{timestamps: true});

export default mongoose.model('Question',questionSchema);