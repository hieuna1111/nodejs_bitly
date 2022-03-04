var validUrl = require("valid-url");
var shortid = require("shortid");

const Url = require("../models/shortlink");
const { sequelize } = require("../config/dbContext");

exports.index = async (req, res) => {
  try {
    const urls = await sequelize.models.shortlink.findAll({});
    return res.status(200).json(urls);
  } catch (error) {
    return res.status(404).json(error);
  }
};

exports.postUrl = async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.baseUrl;

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json({
      message: "Invalid base url",
    });
  }

  // create url code
  const urlCode = shortid.generate();

  // check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await sequelize.models.shortlink.findOne({
        where: {longUrl: longUrl}
      })
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
        console.log("shorturl: ", shortUrl)

         await sequelize.models.shortlink.create({
          urlCode: urlCode,
          longUrl: longUrl,
          shortUrl: shortUrl,
        })

        res.status(200).json(url);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).json({
      message: "Invalid long url",
    });
  }
};
