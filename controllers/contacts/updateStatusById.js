const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const updateStatusById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  }).select("-createdAt -updatedAt");

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

module.exports = updateStatusById;
