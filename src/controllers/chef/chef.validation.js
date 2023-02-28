const Joi = require("joi");

export const login = {
  body: Joi.object()
    .keys({
      email: Joi.string()
      .required()
        .regex(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case "any.empty":
                err.message = "Email should not be empty!";
                break;
              case "any.required":
                err.message = "Email is required field!";
                break;
              case "string.regex.base":
                err.message = "Invalid email id";
              default:
                break;
            }
          });
          return errors;
        }),
      password: Joi.string()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case "any.empty":
                err.message = "password should not be empty!";
                break;
              case "any.required":
                err.message = "password is required field!";
                break;
              default:
                break;
            }
          });
          return errors;
        }),
    })
    .unknown(false)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case "object.allowUnknown":
            err.message = err.path[0] + ` parameter  is not allowed!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
};

export const updateProfile = {
  body: Joi.object()
    .keys({
      first_name: Joi.string().allow(),
      zipcode: Joi.string().allow(),
      description: Joi.string().allow(),
      email: Joi.string()
        .required()
        .regex(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case "any.empty":
                err.message = "Email should not be empty!";
                break;
              case "any.required":
                err.message = "Email is required field!";
                break;
              case "string.regex.base":
                err.message = "Invalid email id";
              default:
                break;
            }
          });
          return errors;
        }),
    })
    .unknown(false)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case "object.allowUnknown":
            err.message = err.path[0] + ` parameter  is not allowed!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
};


export const requestForChef = {
  body: Joi.object()
    .keys({
      first_name: Joi.string().required(),
      zipcode: Joi.string().required(),
      description: Joi.string().required(),
      city:Joi.string().allow(''),
      kind_of_chef:Joi.number().valid(null,1,2,3).allow(''),
      mobile:Joi.number().required(),
      email: Joi.string()
        .required()
        .regex(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case "any.empty":
                err.message = "Email should not be empty!";
                break;
              case "any.required":
                err.message = "Email is required field!";
                break;
              case "string.regex.base":
                err.message = "Invalid email id";
              default:
                break;
            }
          });
          return errors;
        }),
    })
    .unknown(false)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case "object.allowUnknown":
            err.message = err.path[0] + ` parameter  is not allowed!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
};
