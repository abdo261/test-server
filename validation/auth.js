const joi = require("joi");

const validateCreateateUser = (data) => {
  const schema = joi.object({
    first_name: joi
      .string()
      .pattern(/^[A-Za-z \-']+$/)
      .min(3)
      .required()
      .messages({
        "string.base": "First name should be a type of text",
        "string.empty": "First name cannot be an empty field",
        "string.min": "First name should have a minimum length of 3 characters",
        "any.required": "First name is a required field",
        "string.pattern.base":
          "First name should only contain letters, hyphens, and apostrophes",
      }),
    last_name: joi
      .string()
      .pattern(/^[A-Za-z \-']+$/)
      .min(3)
      .required()
      .messages({
        "string.base": "Last name should be a type of text",
        "string.empty": "Last name cannot be an empty field",
        "string.min": "Last name should have a minimum length of 3 characters",
        "any.required": "Last name is a required field",
        "string.pattern.base":
          "First name should only contain letters, hyphens, and apostrophes",
      }),
    CIN: joi
      .string()
      .pattern(/^[A-Z]{1,2}[0-9]{5,6}$/)
      .min(7)
      .max(8)
      .required()
      .messages({
        "string.base": "CIN should be a type of text",
        "string.empty": "CIN cannot be an empty field",
        "string.pattern.base":
          "CIN must have 1 or 2 uppercase letters followed by 5 or 6 digits",
        "string.min": "CIN should have a minimum length of 7 characters",
        "string.max": "CIN should have a maximum length of 8 characters",
        "any.required": "CIN is a required field",
      }),
      phone_number: joi.string()
      .pattern(/^(0)[0-9]{9}$/)
      .length(10)
      .required()
      .messages({
        "string.base": "Phone number should be a type of phone number",
        "string.empty": "Phone number cannot be an empty field",
        "string.pattern.base": "Phone number must start with '0' followed by 9 digits",
        "string.length": "Phone number should have exactly 10 characters",
        "any.required": "Phone number is a required field",
      }),

  });
  return schema.validate(data, { abortEarly: false });
};
const validateLoginUser = (data) => {
  const schema = joi.object({
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .min(8)
      .required()
      .messages({
        "string.base": "Email should be a type of text",
        "string.empty": "Email cannot be empty",
        "string.min": "Email should have a minimum length of 8 characters",
        "any.required": "Email is a required field",
        "string.email": "Email must be a valid email address",
      }),
    password: joi.string().min(8).required().messages({
      "string.base": "Password should be a type of text",
      "string.empty": "Password cannot be empty",
      "string.min": "Password should have a minimum length of 8 characters",
      "any.required": "Password is a required field",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};
const validateUpdateUser = (data) => {
  const schema = joi.object({
    first_name: joi
      .string()
      .pattern(/^[A-Za-z \-']+$/)
      .min(3)
      .optional()
      .messages({
        "string.base": "First name should be a type of text",
        "string.empty": "First name cannot be an empty field",
        "string.min": "First name should have a minimum length of 3 characters",
        "string.pattern.base":
          "First name should only contain letters, hyphens, and apostrophes",
      }),
    last_name: joi
      .string()
      .pattern(/^[A-Za-z \-']+$/)
      .min(3)
      .optional()
      .messages({
        "string.base": "Last name should be a type of text",
        "string.empty": "Last name cannot be an empty field",
        "string.min": "Last name should have a minimum length of 3 characters",
        "string.pattern.base":
          "Last name should only contain letters, hyphens, and apostrophes",
      }),
    CIN: joi
      .string()
      .pattern(/^[A-Z]{1,2}[0-9]{5,6}$/)
      .min(7)
      .max(8)
      .optional()
      .messages({
        "string.base": "CIN should be a type of text",
        "string.empty": "CIN cannot be an empty field",
        "string.pattern.base":
          "CIN must have 1 or 2 uppercase letters followed by 5 or 6 digits",
        "string.min": "CIN should have a minimum length of 7 characters",
        "string.max": "CIN should have a maximum length of 8 characters",
      }),
    phone_number: joi
      .string()
      .pattern(/^(0)[0-9]{9}$/)
      .length(10)
      .optional()
      .messages({
        "string.base": "Phone number should be a type of text",
        "string.empty": "Phone number cannot be an empty field",
        "string.pattern.base": "Phone number must start with '0' followed by 9 digits",
        "string.length": "Phone number should have exactly 10 characters",
      }),
  }).min(1).messages({
    "object.min": "At least one field must be provided for update"
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { validateCreateateUser, validateLoginUser,validateUpdateUser };
