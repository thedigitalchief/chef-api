import express from 'express'
import cuisineController from './cuisine.controllers'


 export const cuisineRouter = express.Router()

cuisineRouter.get('/get-cuisine', cuisineController.getCuisine)
cuisineRouter.get('/get-chef-cuisine-dish', cuisineController.getChefCuisineNDish)
cuisineRouter.get('/get-cuisine-category', cuisineController.getCuisineCategroy)
cuisineRouter.get('/get-chef-cuisines', cuisineController.getChefCuisine)


