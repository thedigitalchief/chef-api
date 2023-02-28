import  homepageService from "./homepage.service";
import { responseMethod } from "../../helpers/index";
import { responseCode } from "../../config/constant";
import chalk from "chalk";



export default {
    async getHomepageTemplate(req, res) {

        await homepageService.getHomepageTemplate(req, res ).then(resp => {
            if (resp) {
                return resp;
              }
        }).catch(err => {
            console.log(chalk.red("get homepage--- err- 1"));
            responseMethod(
              req,
              res,
              {},
              responseCode.INTERNAL_SERVER_ERROR,
              false,
              "Something went wrong"
            );
        })

    }
}