import { responseCode } from '../config/constant'
import crypto  from 'crypto'
const multer = require('multer')
const mailer    = require('nodemailer');
var jwt = require("jsonwebtoken");
// enctype="multipart/form-data"
// var upload = multer({ dest: '../../../public/images' })


 export const responseMethod = (
       req,
       res,
    data,
    code = responseCode.OK,
    success = true,
    message = ""
  ) =>
    res.status(code).send({
      code,
      message: message,
      success: success,
      data,
    });

    export const errorResponse = (
      req,
      res,
      errorMessage = "Something went wrong",
      code = responseCode.INTERNAL_SERVER_ERROR,
      error = {}
    ) =>
      res.status(code).json({
        code,
        errorMessage,
        error,
        data: null,
        success: false,
      });

export const hashPassword =  (pass,salt) => {
    let hash = crypto.createHmac('sha512', salt);
        hash.update(pass);
    let password = hash.digest('hex'); 
    return password ;
}
export const getRandomSalt = function(len) {
  return crypto.randomBytes(len).toString('hex');

}


export const storages = (req, res) => {
  try {
    console.log("===",req)
    var  storage =   multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/images')
      },
      filename: function (req, file, cb) {
        console.log("=====her",file)
        cb(null, Date.now()+ '-' +file.originalname  )
      }
    })
    var upload = multer({ storage: storage })
    return upload
  } catch(err) {
    console.log("===here",err)
  }
  
}


export const uploadImage = async (req, res) => {
  try {
      console.log("-----")
      if (req.file) {
          const file = req.file.location
          return responseObject(req, res, { file });
      }else {
          return responseObject(req, res, { req });
      }
  } catch (error) {   
      error.message = "'Only .png, .jpg and .jpeg format allowed!'    "
      return errorResponse(req, res, error.message);
  }
}

export const sendMail = async function(mailObj){
   var EMAILUSER = "hello@getchefjoy.com"
   var EMAILPASS = "HappyChef@17"
  let transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
              user: EMAILUSER,
              pass: EMAILPASS
          }
      });

  transporter.sendMail(mailObj, (error, info) => {
      if (error) {
          return console.log(error);
      }
  });
  return true;
};


export const generateToken = async function(payload) {
  const token = jwt.sign(
    {
      payload
    },
    process.env.SECRET,
    {
      expiresIn: process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN,
    }
  );
  return token
}


export const extractToken = async (token) => {
  var response = {
    success: false,
    message: "",
    data: "",
  };
  console.log("=====",process.env.SECRET)
  return jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
     console.log("====",err)
      response.message =
        "Your verification link may have expired. Please click on resend for verify your Email.";
      return response;
    }
    response.message = "Valid token";
    response.success = true;
    response.data = user;
    return response;
  });
};