var multer = require("multer");
import { errorResponse, responseMethod } from "../../helpers/index";
import { responseCode } from "../../config/constant";
const fs = require('fs')

export const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: function (req, file, cb) {
      console.log("===imaher", file);
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

export const bulkUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
}).array("image", 10);

export const uploadImage = async (req, res) => {
  try {
    if (req.file) {
      let fileUrl = req.file.path
        .replace(/\\/g, "/")
        .substring("public".length);
      req.file.path = fileUrl;
      var file = req.file.path;
      return responseMethod(
        req,
        res,
        { path: file, filename: req.file.filename },
        responseCode.OK,
        true,
        "Image upload successfully."
      );
    } else {
      return responseMethod(
        req,
        res,
        {},
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong."
      );
    }
  } catch (error) {
    error.message = "'Only .png, .jpg and .jpeg format allowed!'    ";
    return errorResponse(req, res, error.message);
  }
};

export const bulkUploads = async (req, res) => {
  try {
    if (req.files) {
      const dishimage = [];
      req.files.map((item) => {
        var obj = {};
        obj.filename = item.filename;
        let fileUrl = item.path.replace(/\\/g, "/").substring("public".length);
        obj.path = fileUrl;
        dishimage.push(obj);
      });
      return responseMethod(
        req,
        res,
        dishimage,
        responseCode.OK,
        true,
        "Image upload successfully."
      );
    } else {
      return responseMethod(
        req,
        res,
        {},
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong."
      );
    }
  } catch (error) {
    console.log("===", error);
    error.message = "'Only .png, .jpg and .jpeg format allowed!'    ";
    return errorResponse(req, res, error.message);
  }
};

 
export const removeImage = async(req, res) => {
const path = `public/images/${req.params.filename}`
  try {
  await fs.unlinkSync(path)
  return responseMethod(
    req,
    res,
    {},
    responseCode.OK,
    true,
    "image remove successfully."
  );

  } catch(err) {
    console.error(err)
  }

}
 
