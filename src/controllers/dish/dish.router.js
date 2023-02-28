import express from 'express'
import dishController from './dish.controller'
import validate from 'express-validation';
import * as dishValidation from './dish.validation'


 export const dishRouter = express.Router()

dishRouter.post('/add-dish', validate(dishValidation.dish), dishController.addDish)
dishRouter.get('/get-dish',  dishController.getDishByName)
dishRouter.get('/get-chef-dish',  dishController.getChefDish)
dishRouter.get('/get-dish-by-cusineId/:cuisineId',  dishController.getDishByCuisine)
dishRouter.put('/update-dish/:dishId', dishController.editDishByChef)
dishRouter.get('/get-dish-by-id/:dishId', dishController.getDishById)



