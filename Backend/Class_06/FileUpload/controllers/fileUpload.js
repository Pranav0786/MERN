const File = require("../models/File") ;
const cloudinary = require("cloudinary").v2 ;


// localfileupload -> handler function
exports.localFileUpload = async (req,res) => {
    try{
        // fetch file
        const file = req.files.file ;
        console.log("File aagyi hai -> ", file) ;

        // create path where file need to be stored on server   
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH -> ", path) ;

        // add path to the move function
        file.mv(path, (err) => {
            console.log(err) ;
        });

        // create successful response
        res.json({
            success:true,
            message:'Localfile uploaded successfully',
        }) ;

    } catch(error) {
        console.log(error) ;
    }
} ;

function isFileTypeSupported( type , supportedTypes ) {
    return supportedTypes.includes(type) ;
}

async function uploadFileToCloudinary(file,folder , quality ) {
    const options = {folder} ;

    if(quality) {
        options.quality = quality ;
    }

    options.resource_type = "auto" ;
    return await cloudinary.uploader.upload(file.tempFilePath, options) ;
} 

// image upload handler
exports.imageUpload = async (req,res) => {
    try{
        // data fetch
        const {name,tags,email} = req.body ;
        console.log(name,tags,email) ;

        const file = req.files.imageFile ;
        console.log(file) ;

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"] ;
        const fileType = file.name.split('.')[1].toLowerCase() ;

        if( !isFileTypeSupported(fileType , supportedTypes) ) {
            return res.status(400).json({
                success:false,
                message:'File format is not supported',
            }) ;
        }
        // file format supported 
        console.log("Uploading a image on cloudinary")
        const response = await uploadFileToCloudinary(file, "Codehelp") ;
        console.log(response) ;

        // db me save karna hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        }) ;

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'image successfully uploaded',
        }) ;


    } catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'something went wrong while uploading image',
        }) ;
    }
} ;


// video upload
exports.videoUpload = async (req,res) => {
    try{
        // data fetch
        const {name,tags,email} = req.body ;
        console.log(name,tags,email) ;

        const file = req.files.videoFile ;
        // validation
        const supportedTypes = ["mp4", "mov"] ;
        const fileType = file.name.split('.')[1].toLowerCase() ;

        if( !isFileTypeSupported(fileType , supportedTypes) ) {
            return res.status(400).json({
                success:false,
                message:'File format is not supported',
            }) ;
        }
        // file format supported 
        console.log("Uploading a video on cloudinary")
        const response = await uploadFileToCloudinary(file, "Codehelp") ;
        console.log(response) ;

        // db me save karna hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        }) ;

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Video successfully uploaded',
        }) ;

    } catch(error) {
        res.status(400).json({
            success:false ,
            message:'Something went wrong while uploading video' ,
        }) ;
    }
} ;


// reduce size image uploader
exports.imageSizeReducer = async (req,res) => {
    try{ 
        // data fetch
        const {name,tags,email} = req.body ;
        console.log(name,tags,email) ;

        const file = req.files.imageFile ;
        console.log(file) ;

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"] ;
        const fileType = file.name.split('.')[1].toLowerCase() ;

        if( !isFileTypeSupported(fileType , supportedTypes) ) {
            return res.status(400).json({
                success:false,
                message:'File format is not supported',
            }) ;
        }
        // file format supported 
        console.log("Uploading a image on cloudinary")
        const response = await uploadFileToCloudinary(file, "Codehelp", 30) ;
        console.log(response) ;

        // db me save karna hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        }) ;

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'image successfully uploaded',
        }) ;
    } catch(error) {
        res.status(400).json({
            success:false ,
            message:'Something went wrong while uploading image' ,
        }) ;
    }
} ;