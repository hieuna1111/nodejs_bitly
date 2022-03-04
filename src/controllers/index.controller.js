const { sequelize } = require("../config/dbContext");
const Shortlink =  require("../models/shortlink"); 

const location = async (req, res) => {
  try {
    const url = await sequelize.models.shortlink.findOne({
        where: {urlCode: req.params.code}
    })
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({
        message: "Url not define",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  location,
};
