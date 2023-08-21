const Joi = require("joi");

const { REGEXPS } = require("../constants");

const addContactSchema = Joi.object({
  name: Joi.string().min(4).max(255).required(),
  email: Joi.string().min(4).max(255).pattern(REGEXPS.email).required(),
  phone: Joi.string()
    .pattern(
      REGEXPS.phone,
      "pattern: /\\d{3}-\\d{3}-\\d{4}/ example: 123-456-7890"
    )
    .required(),
});

module.exports = addContactSchema;
