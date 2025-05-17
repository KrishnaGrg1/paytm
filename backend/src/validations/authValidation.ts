import Joi from "joi";

const userValidation = {
  register: {
    body: Joi.object().keys({
      username: Joi.string().email().required().messages({
        "string.empty": "Username is required",
        "string.email":"Username must be valid email address"
      }),
      password: Joi.string().min(8).max(50).required().messages({
        "string.empty": "Password is required",
        "string.min": "Passsword must be at least 8 character",
        "string.max": "Password must not exceed 50 characters"
      }),
      firstName: Joi.string().min(2).max(50).required().messages({
        "string.empty": "First name is required",
        "string.min": "First name must be at least 2 characters long",
        "string.max": "First name must not exceed 50 characters"
      }),
      lastName: Joi.string().min(2).max(50).required().messages({
        "string.empty": "Last name is required",
        "string.min": "Last name must be at least 2 characters long",
        "string.max": "Last name must not exceed 50 characters"
      })
    })
  },
  login: {
    body: Joi.object().keys({
      username: Joi.string().email().required().messages({
        "string.empty": "Username is required",
        "string.email":"Username must be valid email address"
      }),
      password: Joi.string().min(8).max(50).required().messages({
        "string.base": "Password must be string",
        "string.empty": "Password is required",
        "string.min": "Password must be atleast 2 characters long",
        "string.max": "Password mustnot exceed 50 characters long",
        "any.required": "Password is required"
      })
    })
  }
};

export default userValidation;
