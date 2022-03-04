const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("shortlink", {
    urlCode: Sequelize.STRING,
    longUrl: Sequelize.STRING,
    shortUrl: Sequelize.STRING,
  });
};
