const { Op } = require("sequelize");
const filterOption = (filter, option) => {
  if (!option.where) {
    option.where = {};
  }
  if (filter) {
    option.where.categoryId = filter.split(",");
  }
  return option;
};

const searchOption = (search, option) => {
    if (!option.where) {
      option.where = {};
    }
  if (search) {
    option.where.name = {
      [Op.iLike]: `%${search}%`,
    };
  }
  return option;
};

module.exports = { filterOption, searchOption };
