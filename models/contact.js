const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../middlewares");
const { REGEXPS } = require("../constants");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 4,
      maxLength: 255,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      minlength: 4,
      maxlength: 255,
      match: REGEXPS.email,
      required: true,
    },
    phone: {
      type: String,
      match: REGEXPS.phone,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

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

const updateContactStatusByIdSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addContactSchema,
  updateContactStatusByIdSchema,
};

module.exports = {
  Contact,
  schemas,
};
