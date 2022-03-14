import mongoose from 'mongoose'
import Questions from '../models/Questions.js'


export const addComment = async (req,res) => {
    const { id: _id } = req.params;
   // console.log(req.params.id);
    //console.log(req.body);
    const { commentBody, userCommented,userId } = req.body;
    console.log(commentBody+" ttt "+userCommented+" dd "+userId);

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('comment unavailable...');
    }

    try {
        const updatedQuestion = await Questions.findByIdAndUpdate( _id, { $addToSet: {'comment': [{ commentBody, userCommented, userId: req.userId}]}}) // : req.userId, // Questions is schema
        res.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json('error in updating')
    }
}