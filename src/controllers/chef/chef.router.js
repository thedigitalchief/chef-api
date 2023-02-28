import express from 'express'
import chefController from './chef.controller'
const multer = require('multer')
import { upload,bulkUpload, removeImage } from "../generic/generic.controller"
import * as genericController from "../generic/generic.controller";

 export const chefRouter = express.Router()


 chefRouter.put('/update-profile',  chefController.updateProfile)
 chefRouter.get('/get-chef-booking', chefController.getChefBooking)
 chefRouter.get('/get-chef-profile', chefController.getChefProfile)
 chefRouter.post('/add-post', chefController.addPost)
 chefRouter.get('/get-post', chefController.getPost)
chefRouter.put("/upload-image", upload.single("profile_pic"), genericController.uploadImage);
chefRouter.put("/upload-bulk-image", bulkUpload, genericController.bulkUploads);
chefRouter.delete("/remove-image/:filename", genericController.removeImage);
