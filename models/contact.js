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

const updateContactStatusByIdSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  Contact,
  schemas,
};
