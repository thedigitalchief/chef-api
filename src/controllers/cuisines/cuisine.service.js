import { responseMethod } from "../../helpers/index";
import { responseCode } from "../../config/constant";
var jwt = require("jsonwebtoken");
import { cuisine,users,
  dish,
  cuisine_category,
} from "../../models/index";
// import { ObjectId } from "bson";
import mongoose from 'mongoose'
// ObjectId = require("mongodb").ObjectID;

export default {
  async getCuisine(req, res) {
    try {
      const cuisines = await cuisine.aggregate([{ $project: { name: 1 } }]);
      if (cuisines.length > 0) {
        return responseMethod(
          req,
          res,
          cuisines,
          responseCode.OK,
          false,
          "Cuisines get successfully."
        );
      } else {
        return responseMethod(
          req,
          res,
          cuisines,
          responseCode.NOT_FOUND,
          false,
          "Data not found"
        );
      }
    } catch (err) {
      return responseMethod(
        req,
        res,
        user,
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong"
      );
    }
  },

  async getChefCuisineNDish(req, res) {
    try {
      const chef = await users
        .findOne({ _id: req.user._id })
        .populate({
          path: "dish",
          model: "dish",
        })
        .populate({
          path: "cuisine",
          model: "cuisine",
        });
      if (chef) {
        //  delete chef.token
        return responseMethod(
          req,
          res,
          chef,
          responseCode.OK,
          true,
          "get chef cuisine successfully"
        );
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.OK,
          true,
          "data not found"
        );
      }
    } catch (err) {
      console.log("====", err);
      return responseMethod(
        req,
        res,
        user,
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong"
      );
    }
  },

  async getCuisineCategroy(req, res) {
    try {
      var page = req.query.page - 1;
      var limit = 10;
      const cuisines = await cuisine_category.aggregate([
        { $project: { category_name: 1 } },
        { $limit: limit },
        { $skip: page * limit },
      ]);
      if (cuisines.length > 0) {
        return responseMethod(
          req,
          res,
          cuisines,
          responseCode.OK,
          false,
          "Cuisines category get successfully."
        );
      } else {
        return responseMethod(
          req,
          res,
          cuisines,
          responseCode.NOT_FOUND,
          false,
          "Data not found"
        );
      }
    } catch (err) {
      return responseMethod(
        req,
        res,
        user,
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong"
      );
    }
  },

  async getChefCuisine(req, res) {
    try {
      var cuisines = await dish.aggregate([
        {
          $match: {
            $or: [
              { primaryChefId: req.user._id },
              { secondaryChefId: { $eq: req.user._id } },
            ],
          },
        },
        { $project: { cuisine: 1, _id: 0 } },
        {$unwind:"$cuisine"},
        {
          $addFields: {
            cuisine: { $toObjectId: "$cuisine" },
          },
        },
        {
          $lookup:{
            from:"cuisines",
            let: { id: "$cuisine" },
            pipeline: [
             { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
            {$project : {_id:1,image1:1,name:1}},
            ],
            as: "cuisines",
          } 
        },
        {$unwind:"$cuisines"},
         
      ]);

   

      cuisines = cuisines.filter((v,i,a)=>a.findIndex(t=>(t.cuisine.toString()  === v.cuisine.toString()))===i)

      if (cuisines.length > 0) {
        return responseMethod(
          req,
          res,
          cuisines,
          responseCode.OK,
          false,
          "Cuisines category get successfully."
        );
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.NOT_FOUND,
          false,
          "Data not found"
        );
      }
    } catch (err) {
      console.log("===erer",err)
      return responseMethod(
        req,
        res,
        user,
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong"
      );
    }
  },
};
