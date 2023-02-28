import express from 'express'
import chefController from '../controllers/chef/chef.controller'
import homepageController from '../controllers/homepage/homepage.controller'
import * as chefValidation from '../controllers/chef/chef.validation'
import validate from 'express-validation';


const pubRoutes = express.Router()

pubRoutes.post('/register', chefController.register )
pubRoutes.post('/login', validate(chefValidation.login),chefController.login )
pubRoutes.get('/get-homepage-template', homepageController.getHomepageTemplate)
pubRoutes.get("/get-all-chef", chefController.getAllChef);
pubRoutes.post("/request-for-chef", chefController.requestForChef);
pubRoutes.post("/forgot-password", chefController.forgotPassword);
pubRoutes.post("/change-password", chefController.resetPassword);








module.exports = pubRoutes