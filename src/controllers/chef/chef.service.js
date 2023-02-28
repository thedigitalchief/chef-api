import {
  responseMethod,
  hashPassword,
  errorResponse,
} from "../../helpers/index";
import { responseCode } from "../../config/constant";
var jwt = require("jsonwebtoken");
import { users, chef_schedule, chef_post } from "../../models/index";
import {
  sendMail,
  generateToken,
  extractToken,
  getRandomSalt,
} from "../../helpers/index";
import { ObjectID } from "bson";
import mongoose from 'mongoose'
var ObjectId = require("mongodb").ObjectID;

export default {
  async register(req, res) {
    try {
      const { mobile, email } = req.body;
      req.body.isVerified;
      const checkUser = await users.findOne({
        $or: [{ mobile: mobile }, { email: email }],
      });
      if (checkUser) {
        if (checkUser.email == email) {
          return responseMethod(
            req,
            res,
            {},
            responseCode.OK,
            true,
            "This email is already in use"
          );
        }
        if (checkUser.mobile == mobile) {
          return responseMethod(
            req,
            res,
            {},
            responseCode.OK,
            true,
            "This mobile number is already in use"
          );
        }
      }
      await users
        .create(req.body)
        .then((resp) => {
          if (resp) {
            return responseMethod(
              req,
              res,
              resp,
              responseCode.OK,
              true,
              "done"
            );
          }
        })
        .catch((err) => {
          console.log("====err", err);
          return responseMethod(
            req,
            res,
            {},
            responseCode.INTERNAL_SERVER_ERROR,
            false,
            "Something went wrong"
          );
        });
    } catch (error) {
      console.log(error);
      return responseMethod(
        req,
        res,
        {},
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "Something went wrong"
      );
    }
  },
  async login(req, res) {
    try {
      const { password, email } = req.body;
      const checkUser = await users.findOne({ email: email }, [
        "first_name",
        "_id",
        "email",
        "mobile",
        "salt",
        "password",
        "profile_pic",
      ]);
      console.log("===", checkUser);
      if (checkUser) {
        let salt = checkUser.salt;
        let Pass = hashPassword(password, salt);
        if (email === checkUser.email && Pass == checkUser.password) {
          var token = jwt.sign(
            {
              user: {
                chefId: checkUser._id,
                email: checkUser.email,
              },
            },
            process.env.SECRET,
            {
              expiresIn: process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN,
            }
          );
          const body = {
            token: token,
          };
          checkUser.token = token;
          checkUser.password = undefined;
          checkUser.salt = undefined;
          const logins = await users.update({ _id: checkUser._id }, body);
          return responseMethod(
            req,
            res,
            { user: checkUser },
            responseCode.OK,
            true,
            "Login success"
          );
        } else {
          return responseMethod(
            req,
            res,
            {},
            responseCode.FORBIDDEN,
            true,
            "password is wrong"
          );
        }
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.FORBIDDEN,
          false,
          "please enter a valid email."
        );
      }
    } catch (error) {
      console.log(error);
      return responseMethod(
        req,
        res,
        {},
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "Something went wrong"
      );
    }
  },
  async getChefProfile(req, res) {
    try {
      let updateProfile = await users.aggregate([
        {
          $match: { _id: req.user._id },
        },
        {
          $project: {
            first_name: 1,
            email: 1,
            mobile: 1,
            zipcode: 1,
            description: 1,
            profile_pic: 1,
            images: 1,
            token: 1,
          },
        },
        {
          $addFields: {
            _id: { $toString: "$_id" },
          },
        },
        {
          $lookup: {
            from: "stripe_users",
            localField: "_id",
            foreignField: "user_id",
            as: "bankDetails",
          },
        },
      ]);
      if (updateProfile) {
        return responseMethod(
          req,
          res,
          updateProfile,
          responseCode.OK,
          false,
          "Get chef profile  successfully."
        );
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.INTERNAL_SERVER_ERROR,
          false,
          "not found."
        );
      }
    } catch (err) {
      console.log("======erorr", err);
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
  async updateProfile(req, res) {
    try {
      console.log("   req.body", req.body);
      const { first_name, mobile, zipcode } = req.body;
      req.body.images = req.body.image;
      var filter = { _id: req.user._id };
      let updateProfile = await users.findOneAndUpdate(filter, req.body, {
        new: true,
      });
      console.log("====updateProfile", updateProfile);
      if (updateProfile) {
        return responseMethod(
          req,
          res,
          updateProfile,
          responseCode.OK,
          true,
          "Chef profile update successfully."
        );
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.INTERNAL_SERVER_ERROR,
          false,
          "something went wrong."
        );
      }
    } catch (err) {
      console.log("======erorr", err);
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
  async getChefBooking(req, res) {
    try {
      var schedule_date = new Date().toUTCString();
      const chefbooking = await chef_schedule.find({
        chef_id: req.user._id,
        schedule_date: { $gt: schedule_date },
      });

      if (chefbooking) {
        return responseMethod(
          req,
          res,
          chefbooking,
          responseCode.OK,
          true,
          "get chef booking successfully"
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
      responseMethod(
        req,
        res,
        user,
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong"
      );
    }
  },
  async addPost(req, res) {
    try {
      req.body.images = req.body.image;
      req.body.chefId = req.user._id;
      await chef_post
        .create(req.body)
        .then((chefPost) => {
          return responseMethod(
            req,
            res,
            chefPost,
            responseCode.OK,
            true,
            "Add post successfully"
          );
        })
        .catch((err) => {
          return responseMethod(
            req,
            res,
            {},
            responseCode.INTERNAL_SERVER_ERROR,
            true,
            "something went wrong"
          );
        });
    } catch (err) {
      responseMethod(
        req,
        res,
        {},
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong"
      );
    }
  },
  async getPost(req, res) {
    try {
      var perPage = 10;
      var page = req.query.page - 1;
      const post = await chef_post
        .find({ chefId: req.user._id })
        .limit(perPage)
        .skip(perPage * page);
      if (post.length > 0) {
        return responseMethod(
          req,
          res,
          post,
          responseCode.OK,
          true,
          "Add post successfully"
        );
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.NOT_FOUND,
          true,
          "Data not found"
        );
      }
    } catch (err) {
      console.log(err);
      responseMethod(
        req,
        res,
        {},
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong"
      );
    }
  },
  async getAllChef(req, res) {
    try {
      console.log("=====hello");
      var perPage = 10;
      var page = req.query.page - 1;
      const chef = await users
        .find({ type: "Chef" }, ["profile_pic", "first_name", "description"])
        .limit(perPage)
        .skip(perPage * page);
      if (chef.length > 0) {
        return responseMethod(
          req,
          res,
          chef,
          responseCode.OK,
          true,
          "Add post successfully"
        );
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.NOT_FOUND,
          true,
          "Data not found"
        );
      }
    } catch (err) {
      console.log(err);
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

  async requestForChef(req, res) {
    try {
      console.log(req.body)
      const checkUser = await users.findOne({ email: req.body.email });
      if(checkUser) {
        return responseMethod(
          req,
          res,
          {},
          responseCode.FORBIDDEN,
          true,
          "Email is already exist."
        );
      } else {
      const {
        first_name,
        email,
        mobile,
        city,
        kind_of_chef,
        description,
        zipcode,
      } = req.body;
      req.body.type = "Chef";
      await users.create(req.body).then((requestForChef) => {
          if (requestForChef) {
            return responseMethod(
              req,
              res,
              requestForChef,
              responseCode.OK,
              true,
              "Request sent for chef successfully."
            );
          }
        })
        .catch((err) => {
          console.log(err);
          return responseMethod(
            req,
            res,
            {},
            responseCode.INTERNAL_SERVER_ERROR,
            false,
            "something went wrong"
          );
        });
      }
    } catch (err) {
      console.log("====", err);
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

  async forgotPassword(req, res) {
    try {
      const checkUser = await users.findOne({ email: req.body.email.trim() });
      if (!checkUser) {
        return responseMethod(
          req,
          res,
          {},
          responseCode.OK,
          true,
          "User is not registered."
        );
      }
      if (checkUser) {
        var mailObj = {};
        const payload = {
          email: checkUser.email,
          _id: checkUser._id,
        };
        const token = await generateToken(payload);
        console.log("=====here",token)

        mailObj.from = '"ChefJoy" <mobileios@interactionone.com>';
        mailObj.to = req.body.email.toLowerCase();
        mailObj.subject = "ChefJoy | Change Password";
        mailObj.html =
          "Dear " +
          checkUser.first_name +
          "<br/><br/>" +
          "Please generate a new password for your account by clicking on the below link<br />" +
          '<a href="http://localhost:3000/reset-password?'+ token +'">Click Here</a><br/><br/><br/>' +
          "Regards.<br/>IO Team.";
          console.log(mailObj.html)
        await sendMail(mailObj);
        return responseMethod(
          req,
          res,
          { token: token },
          responseCode.OK,
          true,
          "Email is sent to your mail."
        );
      }
    } catch (err) {
      console.log("====", err);
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

  async resetPassword(req, res) {
    try{

      const tokenData = await extractToken(req.body.token);
    console.log(tokenData);
    if (tokenData.success) {
      const email = tokenData.data.payload.email;
      await users
        .findOne({ email: email })
        .then(async (user) => {
          if (!user) {
            return responseMethod(
              req,
              res,
              "",
              responseCode.UNAUTHORIZED,
              false,
              "Chef not found"
            );
          }
          if (req.body.confirmpassword != req.body.password) {
            return responseMethod(
              req,
              res,
              "",
              responseCode.UNAUTHORIZED,
              false,
              "Password and confirm password should be equal."
            );
          }
          console.log(req.body.password);
          var salt = getRandomSalt(6);
          const reqPass = await hashPassword(req.body.password, salt);
          let payload = { password: reqPass ,salt: salt };
          await users.updateOne({_id:user._id},{$set:payload}).then((user) => {
            if (user) {
              return responseMethod(
                req,
                res,
                "",
                responseCode.OK,
                false,
                "Password change successfully."
              );
            } else {
              return errorResponse(
                req,
                res,
                "",
                responseCode.INTERNAL_SERVER_ERROR,
                false,
                "Something went Wrong"
              );
            }
          });
        })
        .catch((err) => {
          console.log(err);
          return errorResponse(
            req,
            res,
            "",
            responseCode.INTERNAL_SERVER_ERROR,
            false,
            "Something went wrong"
          );
        });
    } else {
      return responseMethod(
        req,
        res,
        "",
        responseCode.UNAUTHORIZED,
        false,
        tokenData.message
      );
    }
    } catch(err) {
      console.log(err)
      return errorResponse(
        req,
        res,
        "",
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "Something went wrong"
      );
    }
  
  }
    
}
