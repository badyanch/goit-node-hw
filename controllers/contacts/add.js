const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json({
    _id: result._id,
    name: result.name,
    email: result.email,
    phone: result.phone,
    favorite: result.favorite,
  });
};

module.exports = add;
