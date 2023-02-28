import { responseMethod } from "../../helpers/index";
import { responseCode } from "../../config/constant";
var ObjectId = require("mongodb").ObjectID;
import { cms_setting, homepage } from "../../models/index";

export default {
  async getHomepageTemplate(req, res) {
    try {
      const homepageTamplate = await cms_setting.find();
      if (homepageTamplate.length > 0) {
        return responseMethod(
          req,
          res,
          homepageTamplate,
          responseCode.OK,
          true,
          "Get Homepage tamplate successfully."
        );
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.NOT_FOUND,
          true,
          "Data not found."
        );
      }
    } catch (err) {
      console.log(chalk.red("get homepage--- err- 2"));
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
