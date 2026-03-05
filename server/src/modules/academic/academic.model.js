import mongoose, { model,  Schema } from "mongoose";

const UniversitySchema = new Schema({
     fullname: {
        type: String,
        required: true,

    },
    name:{
        type: String
    },
    logo: {
        type: String
    },
    slug: {
        type: String,
        index: true,
        unique: true
    },
    address: String,
    rank: Number,
}, {timestamps: true})

const DegreeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    universityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        index: true
    }
}, {timestamps: true})

const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    degreeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Degree',
        index: true

    },
    semester : {
        type: Number,
        required: true,
        index: true
    }
}, {timestamps: true})

// SubjectSchema.index({ degreeId: 1, semester: 1 })

export const University = model('University', UniversitySchema)
export const Degree = model('Degree', DegreeSchema)
export const Subject = model('Subject', SubjectSchema)


