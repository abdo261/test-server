const Joi = require('joi');


const validateCreateTask = (data) => {
  const schema = Joi.object({
    content: Joi.string().min(3).required().messages({
      "string.base": "Content should be a type of text",
      "string.empty": "Content cannot be an empty field",
      "string.min": "Content should have a minimum length of 3 characters",
      "any.required": "Content is a required field",
    }),
    is_done: Joi.boolean().optional().messages({
      "boolean.base": "Is_done should be a boolean value",
    }),
    start_at: Joi.date().optional().allow(null).messages({
      "date.base": "Start_at should be a valid date",
    }),
    finish_at: Joi.date().optional().allow(null).messages({
      "date.base": "Finish_at should be a valid date",
    }),
    assignement: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).default(null).messages({
      "string.base": "Assignement should be a type of ObjectId",
      "string.pattern.base": "Assignement must be a valid ObjectId"
    }),
  });

  return schema.validate(data, { abortEarly: false });
};


const validateUpdateTask = (data) => {
  const schema = Joi.object({
    content: Joi.string().min(3).optional().messages({
      "string.base": "Content should be a type of text",
      "string.empty": "Content cannot be an empty field",
      "string.min": "Content should have a minimum length of 3 characters",
    }),
    is_done: Joi.boolean().optional().messages({
      "boolean.base": "Is_done should be a boolean value",
    }),
    start_at: Joi.date().optional().allow(null).messages({
      "date.base": "Start_at should be a valid date",
    }),
    finish_at: Joi.date().optional().allow(null).messages({
      "date.base": "Finish_at should be a valid date",
    }),
    assignement: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional().messages({
      "string.base": "Assignement should be a type of ObjectId",
      "string.pattern.base": "Assignement must be a valid ObjectId",
    }),
  }).min(1).messages({
    "object.min": "At least one field must be provided for update",
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { validateCreateTask, validateUpdateTask };
