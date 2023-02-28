import dishService from "./dish.service";
import { responseMethod } from "../../helpers/index";
import { responseCode } from "../../config/constant";
import chalk from "chalk";

export default {
  async addDish(req, res) {
    await dishService
      .addDish(req, res)
      .then((resp) => {
        if (resp) {
          return resp;
        }
      })
      .catch((err) => {
        console.log(chalk.red("add Dish--- err- 1"));
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
  async getDishByName(req, res) {
    await dishService
      .getDishByName(req, res)
      .then((resp) => {
        if (resp) {
          return resp;
        }
      })
      .catch((err) => {
        console.log(chalk.red("add Dish--- err- 1"));
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
  async getChefDish(req, res) {
    await dishService
      .getChefDish(req, res)
      .then((resp) => {
        if (resp) {
          return resp;
        }
      })
      .catch((err) => {
        console.log(chalk.red("add Dish--- err- 1"));
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

  async getDishByCuisine(req, res) {
    await dishService
      .getDishByCuisine(req, res)
      .then((resp) => {
        if (resp) {
          return resp;
        }
      })
      .catch((err) => {
        console.log(chalk.red("add Dish--- err- 1"));
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

  async editDishByChef(req, res) {
    await dishService
      .editDishByChef(req, res)
      .then((resp) => {
        if (resp) {
          return resp;
        }
      })
      .catch((err) => {
        console.log(chalk.red("add Dish--- err- 1"));
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

  async editDishByChef(req, res) {
    await dishService
      .editDishByChef(req, res)
      .then((resp) => {
        if (resp) {
          return resp;
        }
      })
      .catch((err) => {
        console.log(chalk.red("add Dish--- err- 1"));
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

  async getDishById(req, res) {
    await dishService.getDishById(req, res)
      .then((resp) => {
        if (resp) {
          return resp;
        }
      })
      .catch((err) => {
        console.log(chalk.red("add Dish--- err- 1"));
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
