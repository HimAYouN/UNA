import mongoose, { Schema, model } from "mongoose";


const reportSchema = new Schema({
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String
    },
    madeBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    madeTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material'
    },
    isResolved: {
        type: Boolean,
        require: true,
        default: false
    }
    
}, {timestamps: true})

export const Report = model('Report', reportSchema)