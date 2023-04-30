const Search = require("../models/recentSearch");

const addSearch = async (req, res) => {
  try {
    const added = await Search.create(req.body);
    return res.status(200).send({ data: added });
  } catch (error) {
    return res.status(400).send(error);
  }
};
const getSearch = async (req, res) => {
  try {
    const found = await Search.find({}).sort({ createdAt: -1 }).limit(5);
    return res.status(200).send({ data: found });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { addSearch, getSearch };
