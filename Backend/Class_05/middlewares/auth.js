//  auth , isStudent , isAdmin

const jwt= require("jsonwebtoken") ;
require("dotenv").config() ;

exports.auth = (req,res,next) => {
    try{
        // extract jwt token
        const token = req.body.token ;

        if( !token ) {
            return res.status(401).json({
                success:false,
                message:'Token missing',
            }) ;
        }

        // verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET) ;
            console.log(decode) ;

            req.user = decode ;
        } catch(error) {
            return res.status(401).json({
                success:false,
                message:'token is invalide',
            }) ;
        }
        next() ;
    }
    catch(error) {
        return res.status(401).json({
            success:false ,
            message:'Something is wrong while verifying the token',
        }) ;
    }
}


exports.isStudent = (req,res,next) => {
    try{
        if( req.user.role !== "Student" ) {
            return res.status(401).json({
                success:false ,
                message:'This is a protected route for students',
            }) ;
        }
        next() ;
    } catch(error) {
        return res.status(500).json({
            success:false ,
            message: 'User Role is not matching' ,
        }) ;
    }
}

exports.isAdmin = (req,res,next) => {
    try{
        if( req.user.role !== "Admin" ) {
            return res.status(401).json({
                success:false ,
                message:'This is a protected route for admin',
            }) ;
        }
        next() ;
    } catch(error) {
        return res.status(500).json({
            success:false ,
            message: 'User Role is not matching' ,
        }) ;
    }
}
