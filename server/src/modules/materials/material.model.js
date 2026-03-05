
import mongoose from 'mongoose'

const materialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description : String,
    universityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University'

    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        index: true
    },
    type: {
        //enum  notes | pyq
        type: String,
        enum: ['notes' , 'pyq'],
        default: 'notes',
        required: true
    },
    subject: String,
    fileUrl: {
        //link/url 
        type: String,
        // required: true
    },
    publicId: {
        type: String
    },
    fileType: String, //PDF, IMG, ETC
    fileSize: String,
    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    downloadCount: {
        type: Number,
        default: 0 
    },
    status: {
        //enum  pending | approved | rejected'
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        index: true
    }, 
    isDeleted: {
        type: Boolean,
        default: false
    }


}, {timestamps: true})







export const Material = mongoose.model('Material', materialSchema)