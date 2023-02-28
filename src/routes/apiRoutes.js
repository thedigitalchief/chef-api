import express from 'express'
import { chefRouter } from '../controllers/chef/chef.router'
import { cuisineRouter } from '../controllers/cuisines/cuisine.router'
import { dishRouter } from '../controllers/dish/dish.router'

 const apiRoutes = express.Router()

apiRoutes.use('/chef',chefRouter)
apiRoutes.use('/cuisine',cuisineRouter)
apiRoutes.use('/dish',dishRouter)


module.exports = apiRoutes