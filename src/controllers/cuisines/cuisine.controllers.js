import cuisineService from "./cuisine.service";
import { responseMethod } from "../../helpers/index";
import { responseCode } from "../../config/constant";
import chalk from "chalk";

export default {
  async getCuisine(req, res) {
    await cuisineService
      .getCuisine(req, res)
      .then((resp) => {
        if (resp) {
          return resp;
        }
      })
      .catch((err) => {
        console.log(chalk.red("get Cuisine --- err- 1"));
        responseMethod(
          req,
          res,
          {},
          responseCode.INTERNAL_SERVER_ERROR,
          false,
          "Something went wrong"
        );
      });
  },

  async getChefCuisineNDish(req, res) {
    await cuisineService
      .getChefCuisineNDish(req, res)
      .then((resp) => {
        if (resp) {
          return resp;
        }
      })
      .catch((err) => {
        console.log(chalk.red("get Cuisine --- err- 1"));
        responseMethod(
          req,
          res,
          {},
          responseCode.INTERNAL_SERVER_ERROR,
          false,
          "Something went wrong"
        );
      });
  },

  async getCuisineCategroy(req, res) {
    await cuisineService
      .getCuisineCategroy(req, res)
      .then((resp) => {
        if (resp) {
          return resp;
        }
      })
      .catch((err) => {
        console.log(chalk.red("get Cuisine --- err- 1"));
        responseMethod(
          req,
          res,
          {},
          responseCode.INTERNAL_SERVER_ERROR,
          false,
          "Something went wrong"
        );
      });
  },

  async getChefCuisine(req, res) {
    await cuisineService
      .getChefCuisine(req, res)
      .then((resp) => {
        if (resp) {
          return resp;
        }
      })
      .catch((err) => {
        console.log(chalk.red("get Cuisine --- err- 1"));
        responseMethod(
          req,
          res,
          {},
          responseCode.INTERNAL_SERVER_ERROR,
          false,
          "Something went wrong"
        );
      });
  },
};
