import { responseMethod } from "../../helpers/index";
import { responseCode } from "../../config/constant";
import mongoose from "mongoose";
var jwt = require("jsonwebtoken");
import { dish, cuisine } from "../../models/index";
export default {
  async addDish(req, res) {
    try {
      const {
        name,
        description,
        cuisine,
        cooking_info,
        food_type,
        cuisine_category,
        ingredient,
      } = req.body;
      req.body.images = req.body.image;
      const findDishName = await dish.findOne({ name: name });
      if (!findDishName) {
        req.body.primaryChefId = req.user._id;
        await dish
          .create(req.body)
          .then((addDish) => {
            if (addDish) {
              return responseMethod(
                req,
                res,
                addDish,
                responseCode.OK,
                true,
                "add  dish successfully."
              );
            }
          })
          .catch((err) => {
            return responseMethod(
              req,
              res,
              addDish,
              responseCode.INTERNAL_SERVER_ERROR,
              true,
              "something went wrong."
            );
          });
      } else {
        const findDish = await dish.findOne({
          name: name,
          $or: [
            { secondaryChefId: { $eq: req.user._id } },
            { primaryChefId: req.user._id },
          ],
        });
        if (findDish) {
          return responseMethod(
            req,
            res,
            {},
            responseCode.BAD_REQUEST,
            true,
            "Dish name must be uniques."
          );
        }
        var filter = { _id: findDishName._id };
        let doc = await dish.findOneAndUpdate(
          filter,
          { $push: { secondaryChefId: req.user._id } },
          { new: true }
        );
        if (doc) {
          return responseMethod(
            req,
            res,
            doc,
            responseCode.OK,
            true,
            "add dish successfully"
          );
        } else {
          return responseMethod(
            req,
            res,
            {},
            responseCode.NOT_FOUND,
            true,
            "data not found"
          );
        }
      }
    } catch (err) {
      console.log("=====", err);
      return responseMethod(
        req,
        res,
        {},
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong"
      );
    }
  },

  async getDishByName(req, res) {
    try {
      var name = req.query.name.toLowerCase();
      var query;

      if (name) {
        query = { name: { $regex: name } };
      } else {
        query = {};
      }
      const findDish = await dish.aggregate([
        {
          $project: {
            name: { $toLower: "$name" },
          },
        },
        { $match: query },
        { $project: { name: 1 } },
      ]);
      if (findDish) {
        return responseMethod(
          req,
          res,
          findDish,
          responseCode.OK,
          true,
          "Get dish successfully."
        );
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.NOT_FOUND,
          true,
          "data not found"
        );
      }
    } catch (err) {
      console.log("=====", err);
      return responseMethod(
        req,
        res,
        {},
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong"
      );
    }
  },

  async getChefDish(req, res) {
    try {
      const findDish = await dish.aggregate([
        {
          $match: {
            $or: [
              { primaryChefId: req.user._id },
              { secondaryChefId: { $eq: req.user._id } },
            ],
          },
        },
        {
          $lookup: {
            from: "cuisine_categories",
            let: { id: "$cuisine_category" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
              { $project: { category_name: 1, description: 1 } },
            ],
            as: "cuisine_category",
          },
        },
        { $unwind: "$cuisine_category" },
      ]);
      if (findDish.length > 0) {
        return responseMethod(
          req,
          res,
          findDish,
          responseCode.OK,
          true,
          "Get Chef dish successfully."
        );
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.NOT_FOUND,
          true,
          "data not found"
        );
      }
    } catch (err) {
      console.log("=====", err);
      return responseMethod(
        req,
        res,
        {},
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong"
      );
    }
  },

  async getDishByCuisine(req, res) {
    try {
      const findDish = await dish.aggregate([
        { $match: { cuisine: { $eq: req.params.cuisineId } } },
        
      ]);
      if (findDish) {
        return responseMethod(
          req,
          res,
          findDish,
          responseCode.OK,
          true,
          "Get dish successfully."
        );
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.NOT_FOUND,
          true,
          "data not found"
        );
      }
    } catch (err) {
      console.log("=====", err);
      return responseMethod(
        req,
        res,
        {},
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong"
      );
    }
  },

  async editDishByChef(req, res) {
    try {
      const {
        name,
        description,
        cuisine,
        cooking_info,
        food_type,
        cuisine_category,
        ingredient,
      } = req.body;
      req.body.images = req.body.image;
      const findDishName = await dish.findOne({ _id: req.params.dishId });
      if (!findDishName) {
        return responseMethod(
          req,
          res,
          {},
          responseCode.OK,
          true,
          "Dish not found."
        );
      }
      console.log()
      if (findDishName.primaryChefId.toString() != req.user._id.toString()) {
        return responseMethod(
          req,
          res,
          {},
          responseCode.OK,
          true,
          "you are not able to edit dish."
        );
      } else {
        var filter = { _id: findDishName._id };
        const updateDish = await dish.findOneAndUpdate(
          filter,
          { $set: req.body },
          { new: true }
        );
        if (updateDish) {
          return responseMethod(
            req,
            res,
            updateDish,
            responseCode.OK,
            true,
            "Dish update successfully."
          );
        }
      }
    } catch (err) {
      console.log("=====", err);
      return responseMethod(
        req,
        res,
        {},
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong"
      );
    }
  },

  async getDishById(req, res) {
    try {
      const findDish = await dish.findOne({_id:req.params.dishId})
      if (findDish) {
        return responseMethod(
          req,
          res,
          findDish,
          responseCode.OK,
          true,
          "Get dish successfully."
        );
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.NOT_FOUND,
          true,
          "data not found"
        );
      }
    } catch (err) {
      console.log("=====", err);
      return responseMethod(
        req,
        res,
        {},
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong"
      );
    }
  },

};
