import multer from 'multer'

const storage = multer.memoryStorage()

//FILE TYPE 
const fileFilter = (req, file, cb) => {

    
    if (file.mimetype === "application/pdf") {
        cb(null, true)
    } else {
        cb(new Error("Only PDF files are allowed"), false)
    }
    

}


//multer instance///
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB 
    },
    fileFilter
})


export { upload }